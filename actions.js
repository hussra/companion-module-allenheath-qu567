export function getActions(instance) {
	return {
		// ─── MUTES ───────────────────────────────────────────────
		mute_channel: {
			name: 'Mute - Channel On/Off/Toggle',
			options: [
				{
					type: 'dropdown',
					id: 'channel',
					label: 'Channel',
					default: 'ip1',
					choices: [
						{ id: 'ip1',  label: 'Input 1'  },
						{ id: 'ip2',  label: 'Input 2'  },
						{ id: 'ip3',  label: 'Input 3'  },
						{ id: 'ip4',  label: 'Input 4'  },
						{ id: 'ip5',  label: 'Input 5'  },
						{ id: 'ip6',  label: 'Input 6'  },
						{ id: 'ip7',  label: 'Input 7'  },
						{ id: 'ip8',  label: 'Input 8'  },
						{ id: 'ip9',  label: 'Input 9'  },
						{ id: 'ip10', label: 'Input 10' },
						{ id: 'ip11', label: 'Input 11' },
						{ id: 'ip12', label: 'Input 12' },
						{ id: 'st1',  label: 'ST1'      },
						{ id: 'st2',  label: 'ST2'      },
						{ id: 'usb',  label: 'USB'      },
						{ id: 'lr',   label: 'LR Mix'   },
						{ id: 'mix1', label: 'Mix 1'    },
						{ id: 'mix2', label: 'Mix 2'    },
						{ id: 'mix3', label: 'Mix 3'    },
						{ id: 'mix4', label: 'Mix 4'    },
						{ id: 'fx1rtn', label: 'FX1 Return' },
						{ id: 'fx2rtn', label: 'FX2 Return' },
					],
				},
				{
					type: 'dropdown',
					id: 'state',
					label: 'Action',
					default: 'toggle',
					choices: [
						{ id: 'toggle', label: 'Toggle' },
						{ id: 'on',     label: 'Mute On (silence)' },
						{ id: 'off',    label: 'Mute Off (unmute)' },
					],
				},
			],
			callback: async (action) => {
				const { msb, lsb } = getMuteAddress(action.options.channel)
				if (action.options.state === 'toggle') {
					instance.sendMuteToggle(msb, lsb)
				} else {
					instance.sendMute(msb, lsb, action.options.state === 'on')
				}
			},
		},

		// ─── SCENE RECALL ────────────────────────────────────────
		scene_recall: {
			name: 'Scene - Recall Scene',
			options: [
				{
					type: 'number',
					id: 'scene',
					label: 'Scene Number (1-300)',
					default: 1,
					min: 1,
					max: 300,
				},
			],
			callback: async (action) => {
				instance.sendSceneRecall(action.options.scene)
			},
		},

		// ─── SOFT KEYS ───────────────────────────────────────────
		soft_key: {
			name: 'Soft Key - Trigger',
			options: [
				{
					type: 'dropdown',
					id: 'key',
					label: 'Soft Key',
					default: 1,
					choices: [
						{ id: 1,  label: 'Soft Key 1'  },
						{ id: 2,  label: 'Soft Key 2'  },
						{ id: 3,  label: 'Soft Key 3'  },
						{ id: 4,  label: 'Soft Key 4'  },
						{ id: 5,  label: 'Soft Key 5'  },
						{ id: 6,  label: 'Soft Key 6'  },
						{ id: 7,  label: 'Soft Key 7'  },
						{ id: 8,  label: 'Soft Key 8'  },
						{ id: 9,  label: 'Soft Key 9'  },
						{ id: 10, label: 'Soft Key 10' },
						{ id: 11, label: 'Soft Key 11' },
						{ id: 12, label: 'Soft Key 12' },
						{ id: 13, label: 'Soft Key 13' },
						{ id: 14, label: 'Soft Key 14' },
						{ id: 15, label: 'Soft Key 15' },
						{ id: 16, label: 'Soft Key 16' },
					],
				},
			],
			callback: async (action) => {
				instance.sendSoftKey(action.options.key)
			},
		},

		// ─── FADER LEVELS ────────────────────────────────────────
		fader_level: {
			name: 'Fader - Set Level (dB)',
			options: [
				{
					type: 'dropdown',
					id: 'channel',
					label: 'Input Channel',
					default: 'ip1',
					choices: [
						{ id: 'ip1',  label: 'Input 1'  },
						{ id: 'ip2',  label: 'Input 2'  },
						{ id: 'ip3',  label: 'Input 3'  },
						{ id: 'ip4',  label: 'Input 4'  },
						{ id: 'ip5',  label: 'Input 5'  },
						{ id: 'ip6',  label: 'Input 6'  },
						{ id: 'ip7',  label: 'Input 7'  },
						{ id: 'ip8',  label: 'Input 8'  },
						{ id: 'ip9',  label: 'Input 9'  },
						{ id: 'ip10', label: 'Input 10' },
						{ id: 'ip11', label: 'Input 11' },
						{ id: 'ip12', label: 'Input 12' },
						{ id: 'lr',   label: 'LR Mix'   },
					],
				},
				{
					type: 'dropdown',
					id: 'destination',
					label: 'Destination',
					default: 'lr',
					choices: [
						{ id: 'lr',   label: 'LR'    },
						{ id: 'mix1', label: 'Mix 1' },
						{ id: 'mix2', label: 'Mix 2' },
						{ id: 'mix3', label: 'Mix 3' },
						{ id: 'mix4', label: 'Mix 4' },
					],
				},
				{
					type: 'dropdown',
					id: 'level',
					label: 'Level',
					default: '0db',
					choices: [
						{ id: 'inf',  label: '-inf (silence)' },
						{ id: '-60', label: '-60 dB' },
						{ id: '-40', label: '-40 dB' },
						{ id: '-20', label: '-20 dB' },
						{ id: '-12', label: '-12 dB' },
						{ id: '-6',  label: '-6 dB'  },
						{ id: '0db', label: '0 dB (unity)' },
						{ id: '+5',  label: '+5 dB'  },
						{ id: '+10', label: '+10 dB' },
					],
				},
			],
			callback: async (action) => {
				const { msb, lsb } = getLevelAddress(
					action.options.channel,
					action.options.destination
				)
				const { vc, vf } = getLevelValue(action.options.level)
				instance.sendLevel(msb, lsb, vc, vf)
			},
		},

		// ─── FADER RELATIVE ──────────────────────────────────────
		fader_relative: {
			name: 'Fader - Nudge Up or Down 1dB',
			options: [
				{
					type: 'dropdown',
					id: 'channel',
					label: 'Input Channel',
					default: 'ip1',
					choices: [
						{ id: 'ip1',  label: 'Input 1'  },
						{ id: 'ip2',  label: 'Input 2'  },
						{ id: 'ip3',  label: 'Input 3'  },
						{ id: 'ip4',  label: 'Input 4'  },
						{ id: 'ip5',  label: 'Input 5'  },
						{ id: 'ip6',  label: 'Input 6'  },
						{ id: 'ip7',  label: 'Input 7'  },
						{ id: 'ip8',  label: 'Input 8'  },
						{ id: 'ip9',  label: 'Input 9'  },
						{ id: 'ip10', label: 'Input 10' },
						{ id: 'ip11', label: 'Input 11' },
						{ id: 'ip12', label: 'Input 12' },
					],
				},
				{
					type: 'dropdown',
					id: 'destination',
					label: 'Destination',
					default: 'lr',
					choices: [
						{ id: 'lr',   label: 'LR'    },
						{ id: 'mix1', label: 'Mix 1' },
						{ id: 'mix2', label: 'Mix 2' },
						{ id: 'mix3', label: 'Mix 3' },
						{ id: 'mix4', label: 'Mix 4' },
					],
				},
				{
					type: 'dropdown',
					id: 'direction',
					label: 'Direction',
					default: 'up',
					choices: [
						{ id: 'up',   label: '+1 dB (louder)'  },
						{ id: 'down', label: '-1 dB (quieter)' },
					],
				},
			],
			callback: async (action) => {
				const { msb, lsb } = getLevelAddress(
					action.options.channel,
					action.options.destination
				)
				instance.sendLevelRelative(msb, lsb, action.options.direction === 'up')
			},
		},
	}
}

// ─── MUTE ADDRESS TABLE ──────────────────────────────────────────────────────
// From MIDI Protocol PDF page 22
function getMuteAddress(channel) {
	const map = {
		ip1:    { msb: 0x00, lsb: 0x00 },
		ip2:    { msb: 0x00, lsb: 0x01 },
		ip3:    { msb: 0x00, lsb: 0x02 },
		ip4:    { msb: 0x00, lsb: 0x03 },
		ip5:    { msb: 0x00, lsb: 0x04 },
		ip6:    { msb: 0x00, lsb: 0x05 },
		ip7:    { msb: 0x00, lsb: 0x06 },
		ip8:    { msb: 0x00, lsb: 0x07 },
		ip9:    { msb: 0x00, lsb: 0x08 },
		ip10:   { msb: 0x00, lsb: 0x09 },
		ip11:   { msb: 0x00, lsb: 0x0A },
		ip12:   { msb: 0x00, lsb: 0x0B },
		st1:    { msb: 0x00, lsb: 0x20 },
		st2:    { msb: 0x00, lsb: 0x22 },
		usb:    { msb: 0x00, lsb: 0x24 },
		lr:     { msb: 0x00, lsb: 0x44 },
		mix1:   { msb: 0x00, lsb: 0x45 },
		mix2:   { msb: 0x00, lsb: 0x46 },
		mix3:   { msb: 0x00, lsb: 0x47 },
		mix4:   { msb: 0x00, lsb: 0x48 },
		fx1rtn: { msb: 0x00, lsb: 0x3C },
		fx2rtn: { msb: 0x00, lsb: 0x3D },
	}
	return map[channel] || { msb: 0x00, lsb: 0x00 }
}

// ─── LEVEL ADDRESS TABLE ─────────────────────────────────────────────────────
// From MIDI Protocol PDF page 23 - Inputs to LR/Aux
function getLevelAddress(channel, destination) {
	const map = {
		ip1:  { lr: { msb: 0x40, lsb: 0x00 }, mix1: { msb: 0x40, lsb: 0x44 }, mix2: { msb: 0x40, lsb: 0x45 }, mix3: { msb: 0x40, lsb: 0x46 }, mix4: { msb: 0x40, lsb: 0x47 } },
		ip2:  { lr: { msb: 0x40, lsb: 0x01 }, mix1: { msb: 0x40, lsb: 0x50 }, mix2: { msb: 0x40, lsb: 0x51 }, mix3: { msb: 0x40, lsb: 0x52 }, mix4: { msb: 0x40, lsb: 0x53 } },
		ip3:  { lr: { msb: 0x40, lsb: 0x02 }, mix1: { msb: 0x40, lsb: 0x5C }, mix2: { msb: 0x40, lsb: 0x5D }, mix3: { msb: 0x40, lsb: 0x5E }, mix4: { msb: 0x40, lsb: 0x5F } },
		ip4:  { lr: { msb: 0x40, lsb: 0x03 }, mix1: { msb: 0x40, lsb: 0x68 }, mix2: { msb: 0x40, lsb: 0x69 }, mix3: { msb: 0x40, lsb: 0x6A }, mix4: { msb: 0x40, lsb: 0x6B } },
		ip5:  { lr: { msb: 0x40, lsb: 0x04 }, mix1: { msb: 0x40, lsb: 0x74 }, mix2: { msb: 0x40, lsb: 0x75 }, mix3: { msb: 0x40, lsb: 0x76 }, mix4: { msb: 0x40, lsb: 0x77 } },
		ip6:  { lr: { msb: 0x40, lsb: 0x05 }, mix1: { msb: 0x41, lsb: 0x00 }, mix2: { msb: 0x41, lsb: 0x01 }, mix3: { msb: 0x41, lsb: 0x02 }, mix4: { msb: 0x41, lsb: 0x03 } },
		ip7:  { lr: { msb: 0x40, lsb: 0x06 }, mix1: { msb: 0x41, lsb: 0x0C }, mix2: { msb: 0x41, lsb: 0x0D }, mix3: { msb: 0x41, lsb: 0x0E }, mix4: { msb: 0x41, lsb: 0x0F } },
		ip8:  { lr: { msb: 0x40, lsb: 0x07 }, mix1: { msb: 0x41, lsb: 0x18 }, mix2: { msb: 0x41, lsb: 0x19 }, mix3: { msb: 0x41, lsb: 0x1A }, mix4: { msb: 0x41, lsb: 0x1B } },
		ip9:  { lr: { msb: 0x40, lsb: 0x08 }, mix1: { msb: 0x41, lsb: 0x24 }, mix2: { msb: 0x41, lsb: 0x25 }, mix3: { msb: 0x41, lsb: 0x26 }, mix4: { msb: 0x41, lsb: 0x27 } },
		ip10: { lr: { msb: 0x40, lsb: 0x09 }, mix1: { msb: 0x41, lsb: 0x30 }, mix2: { msb: 0x41, lsb: 0x31 }, mix3: { msb: 0x41, lsb: 0x32 }, mix4: { msb: 0x41, lsb: 0x33 } },
		ip11: { lr: { msb: 0x40, lsb: 0x0A }, mix1: { msb: 0x41, lsb: 0x3C }, mix2: { msb: 0x41, lsb: 0x3D }, mix3: { msb: 0x41, lsb: 0x3E }, mix4: { msb: 0x41, lsb: 0x3F } },
		ip12: { lr: { msb: 0x40, lsb: 0x0B }, mix1: { msb: 0x41, lsb: 0x48 }, mix2: { msb: 0x41, lsb: 0x49 }, mix3: { msb: 0x41, lsb: 0x4A }, mix4: { msb: 0x41, lsb: 0x4B } },
		lr:   { lr: { msb: 0x4F, lsb: 0x00 }, mix1: { msb: 0x4E, lsb: 0x27 }, mix2: { msb: 0x4E, lsb: 0x2A }, mix3: { msb: 0x4E, lsb: 0x2D }, mix4: { msb: 0x4E, lsb: 0x30 } },
	}
	return map[channel]?.[destination] || { msb: 0x40, lsb: 0x00 }
}

// ─── LEVEL VALUE TABLE ───────────────────────────────────────────────────────
// Audio Taper values from MIDI Protocol PDF page 21
function getLevelValue(level) {
	const map = {
		inf:  { vc: 0x00, vf: 0x00 },
		'-60': { vc: 0x06, vf: 0x00 },
		'-40': { vc: 0x0F, vf: 0x40 },
		'-20': { vc: 0x2E, vf: 0x40 },
		'-12': { vc: 0x3B, vf: 0x00 },
		'-6':  { vc: 0x4B, vf: 0x00 },
		'0db': { vc: 0x62, vf: 0x00 },
		'+5':  { vc: 0x73, vf: 0x40 },
		'+10': { vc: 0x7F, vf: 0x40 },
	}
	return map[level] || { vc: 0x62, vf: 0x00 }
}