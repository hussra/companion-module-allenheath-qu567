# companion-module-allenheath-qu567

A [Bitfocus Companion](https://bitfocus.io/companion) module for controlling **Allen & Heath Qu-5, Qu-6, and Qu-7** digital mixing consoles via MIDI over TCP.

---

## Features

- **Mute / Unmute** any channel (Inputs 1–12, ST1, ST2, USB, LR, Mix 1–4, FX 1/2 Return)
- **Mute Toggle** — flips the current mute state with a single button press
- **Fader Level** — set absolute fader levels in dB (from -∞ to +10 dB)
- **Fader Relative** — nudge faders up or down one step
- **Scene Recall** — recall any scene (1–300)
- **Soft Keys** — trigger the mixer's built-in soft key buttons (1–8)
- **Feedback** — button colours update to show live mute state

---

## Requirements

- Allen & Heath Qu-5, Qu-6, or Qu-7 mixer
- Qu mixer network port **51325** open (MIDI over TCP — enabled by default)
- Mixer and Companion on the **same network**
- Bitfocus Companion **v3.0+**

---

## Installation

### Option A — Manual (copy files)

1. Download or clone this repo
2. Inside the downloaded folder, run `install-module.command` (double-click on macOS)
3. In Companion's web UI, open the top-right menu and click **Refresh modules list**
4. Go to **Connections → Add connection**, search for **Allen & Heath**

### Option B — From source

```bash
git clone https://github.com/Bamagastudios/companion-module-allenheath-qu567.git
cd companion-module-allenheath-qu567
npm install
npm run build
```

Then copy the contents of `module-output/` into:
- **macOS:** `~/Library/Application Support/companion/modules/allenheath-qu567-1.0.0/`
- **Windows:** `%APPDATA%\companion\modules\allenheath-qu567-1.0.0\`
- **Linux:** `~/.config/companion/modules/allenheath-qu567-1.0.0/`

---

## Configuration

| Field | Description | Default |
|---|---|---|
| Mixer IP Address | The IP address of your Qu mixer | `192.168.1.70` |
| MIDI Channel | MIDI channel the mixer is set to (1–16) | `1` |

To find your mixer's IP: on the mixer, press the **Setup** button → **Network**.

---

## Available Actions

| Action | Description |
|---|---|
| Mute Channel | Mute or unmute a specific channel |
| Mute Toggle | Toggle the mute state of a channel |
| Fader Level | Set a channel's fader to a specific dB level |
| Fader Relative | Nudge a fader up or down one step |
| Scene Recall | Recall a saved scene (1–300) |
| Soft Key | Trigger a soft key button (1–8) |

---

## Feedbacks

| Feedback | Description |
|---|---|
| Mute State | Button turns red when a channel is muted |

---

## Protocol Notes

This module communicates using **MIDI NRPN messages over TCP** on port **51325**. This is the native protocol used by Allen & Heath Qu-series mixers for network MIDI control.

- Mute / fader: NRPN (CC 99/98/6/38)
- Scene recall: Bank Select (CC 0) + Program Change
- Soft keys: MIDI Note On/Off

---

## Supported Mixers

| Model | Status |
|---|---|
| Allen & Heath Qu-5 | ✅ Tested / Supported |
| Allen & Heath Qu-6 | ✅ Supported |
| Allen & Heath Qu-7 | ✅ Supported |

---

## License

MIT © [Bamagastudios](https://github.com/Bamagastudios)

---

## Contributing

Issues and pull requests welcome! Please open an issue first to discuss any significant changes.
