export function getPresets(_instance) {
	const presets = {}

	// ─── MUTE PRESETS ─────────────────────────────────────────
	const muteChannels = [
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
		{ id: 'mix1', label: 'Mix 1'    },
		{ id: 'mix2', label: 'Mix 2'    },
		{ id: 'mix3', label: 'Mix 3'    },
		{ id: 'mix4', label: 'Mix 4'    },
	]

	for (const ch of muteChannels) {
		presets[`mute_toggle_${ch.id}`] = {
			type: 'button',
			category: 'Mutes',
			name: `Mute ${ch.label}`,
			style: {
				text: `MUTE\n${ch.label}`,
				size: '14',
				color: 0xFFFFFF,
				bgcolor: 0x333333,
			},
			feedbacks: [
				{
					feedbackId: 'mute_state',
					options: { channel: ch.id },
					style: {
						bgcolor: 0xFF0000,
						color: 0xFFFFFF,
					},
				},
			],
			steps: [
				{
					down: [
						{
							actionId: 'mute_channel',
							options: {
								channel: ch.id,
								state: 'toggle',
							},
						},
					],
					up: [],
				},
			],
		}
	}

	// ─── SCENE PRESETS ────────────────────────────────────────
	for (let i = 1; i <= 10; i++) {
		presets[`scene_${i}`] = {
			type: 'button',
			category: 'Scenes',
			name: `Scene ${i}`,
			style: {
				text: `SCENE\n${i}`,
				size: '14',
				color: 0xFFFFFF,
				bgcolor: 0x0055CC,
			},
			feedbacks: [],
			steps: [
				{
					down: [
						{
							actionId: 'scene_recall',
							options: { scene: i },
						},
					],
					up: [],
				},
			],
		}
	}

	// ─── SOFT KEY PRESETS ─────────────────────────────────────
	for (let i = 1; i <= 8; i++) {
		presets[`softkey_${i}`] = {
			type: 'button',
			category: 'Soft Keys',
			name: `Soft Key ${i}`,
			style: {
				text: `SK ${i}`,
				size: '18',
				color: 0xFFFFFF,
				bgcolor: 0x006600,
			},
			feedbacks: [],
			steps: [
				{
					down: [
						{
							actionId: 'soft_key',
							options: { key: i },
						},
					],
					up: [],
				},
			],
		}
	}

	// ─── FADER NUDGE PRESETS ──────────────────────────────────
	const faderChannels = [
		{ id: 'ip1', label: 'Ch 1' },
		{ id: 'ip2', label: 'Ch 2' },
		{ id: 'ip3', label: 'Ch 3' },
		{ id: 'ip4', label: 'Ch 4' },
	]

	for (const ch of faderChannels) {
		presets[`fader_up_${ch.id}`] = {
			type: 'button',
			category: 'Faders',
			name: `${ch.label} +1dB`,
			style: {
				text: `${ch.label}\n▲ 1dB`,
				size: '14',
				color: 0xFFFFFF,
				bgcolor: 0x004444,
			},
			feedbacks: [],
			steps: [
				{
					down: [
						{
							actionId: 'fader_relative',
							options: {
								channel: ch.id,
								destination: 'lr',
								direction: 'up',
							},
						},
					],
					up: [],
				},
			],
		}

		presets[`fader_down_${ch.id}`] = {
			type: 'button',
			category: 'Faders',
			name: `${ch.label} -1dB`,
			style: {
				text: `${ch.label}\n▼ 1dB`,
				size: '14',
				color: 0xFFFFFF,
				bgcolor: 0x004444,
			},
			feedbacks: [],
			steps: [
				{
					down: [
						{
							actionId: 'fader_relative',
							options: {
								channel: ch.id,
								destination: 'lr',
								direction: 'down',
							},
						},
					],
					up: [],
				},
			],
		}
	}

	return presets
}
