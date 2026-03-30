import { InstanceBase, runEntrypoint, InstanceStatus } from '@companion-module/base'
import { getActions } from './actions.js'
import { getFeedbacks } from './feedbacks.js'
import { getPresets } from './presets.js'
import net from 'net'

class AllenHeathQu567 extends InstanceBase {
	constructor(internal) {
		super(internal)
		this.socket = null
		this.reconnectTimer = null
		this.muteStates = {}
	}

	async init(config) {
		this.config = config
		this.updateStatus(InstanceStatus.Disconnected)
		this.setActionDefinitions(getActions(this))
		this.setFeedbackDefinitions(getFeedbacks(this))
		this.setPresetDefinitions(getPresets(this))
		this.connect()
	}

	async destroy() {
		this.disconnect()
	}

	async configUpdated(config) {
		this.config = config
		this.disconnect()
		this.connect()
	}

	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Mixer IP Address',
				width: 8,
				default: '192.168.1.70',
			},
			{
				type: 'number',
				id: 'midiChannel',
				label: 'MIDI Channel (1-16)',
				width: 4,
				min: 1,
				max: 16,
				default: 1,
			},
		]
	}

	connect() {
		if (!this.config.host) {
			this.updateStatus(InstanceStatus.BadConfig, 'No IP address set')
			return
		}

		this.socket = new net.Socket()

		this.socket.connect(51325, this.config.host, () => {
			this.log('info', `Connected to Qu-5/6/7 at ${this.config.host}`)
			this.updateStatus(InstanceStatus.Ok)
			if (this.reconnectTimer) {
				clearTimeout(this.reconnectTimer)
				this.reconnectTimer = null
			}
		})

		this.socket.on('data', (data) => {
			this.handleIncoming(data)
		})

		this.socket.on('error', (err) => {
			this.log('error', `Connection error: ${err.message}`)
			this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
			this.scheduleReconnect()
		})

		this.socket.on('close', () => {
			this.log('warn', 'Connection closed')
			this.updateStatus(InstanceStatus.Disconnected)
			this.scheduleReconnect()
		})
	}

	disconnect() {
		if (this.reconnectTimer) {
			clearTimeout(this.reconnectTimer)
			this.reconnectTimer = null
		}
		if (this.socket) {
			this.socket.destroy()
			this.socket = null
		}
	}

	scheduleReconnect() {
		if (this.reconnectTimer) return
		this.reconnectTimer = setTimeout(() => {
			this.reconnectTimer = null
			this.log('info', 'Attempting to reconnect...')
			this.connect()
		}, 5000)
	}

	handleIncoming(data) {
		// Parse incoming MIDI NRPN messages from mixer.
		// Each CC message is 3 bytes: [0xBN, CC_NUMBER, VALUE]
		// A full absolute NRPN set = 4 CCs = 12 bytes:
		//   [i+0]  0xBN  [i+1]  0x63  [i+2]  paramMSB
		//   [i+3]  0xBN  [i+4]  0x62  [i+5]  paramLSB
		//   [i+6]  0xBN  [i+7]  0x06  [i+8]  valueCoarse
		//   [i+9]  0xBN  [i+10] 0x26  [i+11] valueFine
		const midiCh = this.config.midiChannel - 1
		const statusByte = 0xB0 | midiCh

		for (let i = 0; i <= data.length - 12; i++) {
			if (
				data[i]      === statusByte &&
				data[i + 1]  === 0x63 &&
				data[i + 3]  === statusByte &&
				data[i + 4]  === 0x62 &&
				data[i + 6]  === statusByte &&
				data[i + 7]  === 0x06 &&
				data[i + 9]  === statusByte &&
				data[i + 10] === 0x26
			) {
				const paramMSB    = data[i + 2]
				const paramLSB    = data[i + 5]
				const valueCoarse = data[i + 8]
				// Mute: coarse = 0x01 (muted) or 0x00 (unmuted)
				const key = `${paramMSB}_${paramLSB}`
				this.muteStates[key] = valueCoarse === 0x01
				this.checkFeedbacks('mute_state')
				i += 11 // skip past this full 12-byte NRPN message
			}
		}
	}

	sendMidi(bytes) {
		if (!this.socket || this.socket.destroyed) {
			this.log('warn', 'Cannot send - not connected')
			return
		}
		const buf = Buffer.from(bytes)
		this.socket.write(buf)
	}

	// Helper: get MIDI channel byte (0-indexed)
	getMidiChannelByte() {
		return (this.config.midiChannel - 1) & 0x0F
	}

	// Send a mute on/off command
	sendMute(msb, lsb, muteOn) {
		const n = this.getMidiChannelByte()
		this.sendMidi([
			0xB0 | n, 0x63, msb,
			0xB0 | n, 0x62, lsb,
			0xB0 | n, 0x06, 0x00,
			0xB0 | n, 0x26, muteOn ? 0x01 : 0x00,
		])
	}

	// Send a mute toggle command (state-based: reads known state then flips it)
	sendMuteToggle(msb, lsb) {
		const key = `${msb}_${lsb}`
		const currentlyMuted = this.muteStates[key] === true
		this.sendMute(msb, lsb, !currentlyMuted)
		// Optimistically update local state so the feedback updates immediately
		this.muteStates[key] = !currentlyMuted
		this.checkFeedbacks('mute_state')
	}

	// Send a scene recall
	sendSceneRecall(scene) {
		const n = this.getMidiChannelByte()
		let bank = 0x00
		let program = scene - 1
		if (scene > 128) {
			bank = 0x01
			program = scene - 129
		}
		if (scene > 256) {
			bank = 0x02
			program = scene - 257
		}
		this.sendMidi([
			0xB0 | n, 0x00, bank,
			0xC0 | n, program,
		])
	}

	// Send soft key press
	sendSoftKey(keyNum) {
		const n = this.getMidiChannelByte()
		const note = 0x30 + (keyNum - 1)
		// Note on
		this.sendMidi([0x90 | n, note, 0x7F])
		// Note off after 100ms
		setTimeout(() => {
			this.sendMidi([0x80 | n, note, 0x00])
		}, 100)
	}

	// Send fader level (absolute, audio taper)
	sendLevel(msb, lsb, vc, vf) {
		const n = this.getMidiChannelByte()
		this.sendMidi([
			0xB0 | n, 0x63, msb,
			0xB0 | n, 0x62, lsb,
			0xB0 | n, 0x06, vc,
			0xB0 | n, 0x26, vf,
		])
	}

	// Send relative level increment/decrement
	sendLevelRelative(msb, lsb, increment) {
		const n = this.getMidiChannelByte()
		this.sendMidi([
			0xB0 | n, 0x63, msb,
			0xB0 | n, 0x62, lsb,
			0xB0 | n, increment ? 0x60 : 0x61, 0x00,
		])
	}
}

runEntrypoint(AllenHeathQu567, [])