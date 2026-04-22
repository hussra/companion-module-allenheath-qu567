export function getFeedbacks(instance) {
	return {
		mute_state: {
			name: 'Mute - Show Mute State',
			description: 'Button changes colour based on whether channel is muted',
			type: 'boolean',
			defaultStyle: {
				bgcolor: 0xFF0000,
				color: 0xFFFFFF,
			},
			options: [
				{
					type: 'dropdown',
					id: 'channel',
					label: 'Channel',
					default: 'ip1',
					choices: [
						{ id: 'ip1',    label: 'Input 1'     },
						{ id: 'ip2',    label: 'Input 2'     },
						{ id: 'ip3',    label: 'Input 3'     },
						{ id: 'ip4',    label: 'Input 4'     },
						{ id: 'ip5',    label: 'Input 5'     },
						{ id: 'ip6',    label: 'Input 6'     },
						{ id: 'ip7',    label: 'Input 7'     },
						{ id: 'ip8',    label: 'Input 8'     },
						{ id: 'ip9',    label: 'Input 9'     },
						{ id: 'ip10',   label: 'Input 10'    },
						{ id: 'ip11',   label: 'Input 11'    },
						{ id: 'ip12',   label: 'Input 12'    },
						{ id: 'st1',    label: 'ST1'         },
						{ id: 'st2',    label: 'ST2'         },
						{ id: 'usb',    label: 'USB'         },
						{ id: 'lr',     label: 'LR Mix'      },
						{ id: 'mix1',   label: 'Mix 1'       },
						{ id: 'mix2',   label: 'Mix 2'       },
						{ id: 'mix3',   label: 'Mix 3'       },
						{ id: 'mix4',   label: 'Mix 4'       },
						{ id: 'fx1rtn', label: 'FX1 Return'  },
						{ id: 'fx2rtn', label: 'FX2 Return'  },
					],
				},
			],
			callback: (feedback) => {
				const { msb, lsb } = getMuteAddress(feedback.options.channel)
				const key = `${msb}_${lsb}`
				return instance.muteStates[key] === true
			},
		},
	}
}

// ─── MUTE ADDRESS TABLE ──────────────────────────────────────────────────────
// Duplicated here so feedbacks.js is self contained
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
