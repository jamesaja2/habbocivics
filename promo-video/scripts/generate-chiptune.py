import math
import struct
import wave
import os

SAMPLE_RATE = 44100
DURATION = 46.0  # 46 seconds to cover entire 45s composition
BPM = 125.0
BEAT_DUR = 60.0 / BPM
SIXTEENTH = BEAT_DUR / 4.0

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
os.makedirs(OUT_DIR, exist_ok=True)
OUT_PATH = os.path.join(OUT_DIR, "bgm_chiptune.wav")

total_samples = int(SAMPLE_RATE * DURATION)
master_buffer = [0.0] * total_samples

def midi_to_freq(m):
    return 440.0 * (2.0 ** ((m - 69) / 12.0))

# Chord progression in C minor / Eb major:
# 1. Cm (C-Eb-G)
# 2. Ab (Ab-C-Eb)
# 3. Bb (Bb-D-F)
# 4. G7/B (G-B-D-F)
CHORDS = [
    ([60, 63, 67, 72], 36),  # Cm
    ([56, 60, 63, 68], 32),  # Ab
    ([58, 62, 65, 70], 34),  # Bb
    ([55, 59, 62, 67], 31),  # G
]

lead_pattern = [0, 2, 1, 3, 2, 0, 1, 2, 3, 1, 2, 0, 1, 3, 2, 1]

cur_time = 0.0
measure = 0

while cur_time < DURATION:
    chord_notes, bass_root = CHORDS[measure % len(CHORDS)]
    measure_start = cur_time

    # 16 sixteenths per measure
    for s in range(16):
        t_note = measure_start + s * SIXTEENTH
        if t_note >= DURATION:
            break

        idx_chord = lead_pattern[s % len(lead_pattern)]
        lead_midi = chord_notes[idx_chord % len(chord_notes)] + 12 # higher octave
        freq_lead = midi_to_freq(lead_midi)

        # Lead square wave (25% duty cycle for authentic 8-bit NES sound)
        n_samples = int(SIXTEENTH * SAMPLE_RATE)
        start_sample = int(t_note * SAMPLE_RATE)

        for i in range(n_samples):
            pos = start_sample + i
            if pos >= total_samples:
                break
            t = i / SAMPLE_RATE
            env = max(0.0, 1.0 - (t / SIXTEENTH) * 0.8)
            # Pulse 25%
            phase = (t * freq_lead) % 1.0
            val = 0.14 if phase < 0.25 else -0.14
            master_buffer[pos] += val * env

        # Bass triangle wave
        if s % 2 == 0: # 8th notes
            bass_midi = bass_root + (12 if (s == 4 or s == 12) else 0)
            freq_bass = midi_to_freq(bass_midi)
            bass_samples = int(SIXTEENTH * 2 * SAMPLE_RATE)
            for i in range(bass_samples):
                pos = start_sample + i
                if pos >= total_samples:
                    break
                t = i / SAMPLE_RATE
                env = max(0.0, 1.0 - (t / (SIXTEENTH * 2)) * 0.4)
                # Triangle wave
                phase = (t * freq_bass) % 1.0
                tri = 4.0 * abs(phase - 0.5) - 1.0
                master_buffer[pos] += tri * 0.22 * env

        # Drum Track
        # Kick on 0, 4, 8, 12 (every beat)
        if s % 4 == 0:
            kick_dur = 0.12
            k_samples = int(kick_dur * SAMPLE_RATE)
            for i in range(k_samples):
                pos = start_sample + i
                if pos >= total_samples:
                    break
                t = i / SAMPLE_RATE
                # Pitch drops from 150Hz to 40Hz
                f_kick = 150.0 * math.exp(-t * 28.0)
                env_k = max(0.0, 1.0 - t / kick_dur)
                val_k = math.sin(2.0 * math.pi * f_kick * t)
                master_buffer[pos] += val_k * 0.35 * env_k

        # Snare on 4, 12 (beat 2 and 4)
        if s % 8 == 4:
            snare_dur = 0.15
            sn_samples = int(snare_dur * SAMPLE_RATE)
            seed = (s * 9301 + 49297) % 233280
            for i in range(sn_samples):
                pos = start_sample + i
                if pos >= total_samples:
                    break
                t = i / SAMPLE_RATE
                env_sn = max(0.0, 1.0 - t / snare_dur)
                # Noise pseudo-random
                seed = (seed * 9301 + 49297) % 233280
                noise = (seed / 233280.0) * 2.0 - 1.0
                tone = math.sin(2.0 * math.pi * 180.0 * t) * 0.3
                master_buffer[pos] += (noise * 0.7 + tone) * 0.25 * env_sn

        # Hi-hat on every 16th
        hh_dur = 0.04
        hh_samples = int(hh_dur * SAMPLE_RATE)
        seed_hh = (s * 7919 + 1013) % 65536
        for i in range(hh_samples):
            pos = start_sample + i
            if pos >= total_samples:
                break
            t = i / SAMPLE_RATE
            env_hh = max(0.0, 1.0 - t / hh_dur)
            seed_hh = (seed_hh * 7919 + 1013) % 65536
            noise_hh = (seed_hh / 65536.0) * 2.0 - 1.0
            master_buffer[pos] += noise_hh * 0.08 * env_hh

    cur_time += BEAT_DUR * 4.0
    measure += 1

# Normalize and write to 16-bit WAV
max_val = max(abs(x) for x in master_buffer) or 1.0
gain = 0.82 / max_val

with wave.open(OUT_PATH, "wb") as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(SAMPLE_RATE)
    raw_bytes = bytearray()
    for s in master_buffer:
        val = int(max(-1.0, min(1.0, s * gain)) * 32767.0)
        raw_bytes.extend(struct.pack("<h", val))
    wf.writeframes(raw_bytes)

print(f"Generated Chiptune BGM: {OUT_PATH} (Duration: {DURATION}s)")
