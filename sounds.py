import numpy as np
import wave

# Parameter
samplerate = 44100  # 44.1 kHz Standard
duration = 2.0  # Dauer auf 2 Sekunden erhöhen
frequencies = [440, 660, 880, 1320, 1760]  # Verschiedene Frequenzen für den futuristischen Klang

# Zeitachse für die Dauer
t = np.linspace(0, duration, int(samplerate * duration), False)

# Erstellen der Wellenform mit mehreren Frequenzen und einer modulierenden Komponente
sound = sum(np.sin(2 * np.pi * f * t + np.sin(2 * np.pi * 0.1 * t)) for f in frequencies) / len(frequencies)

# Modulationseffekt hinzufügen für einen futuristischen Klang (Oscillation)
modulated_sound = np.sin(2 * np.pi * 0.5 * t) * sound

# Amplitude anpassen, um Verzerrung zu vermeiden
modulated_sound = modulated_sound / 2.0

# Fade-In und Fade-Out hinzufügen (leichte Ein- und Ausblendung)
fade_in = np.linspace(0, 1, int(samplerate * 0.2))  # 200ms Fade-In
fade_out = np.linspace(1, 0, int(samplerate * 0.2))  # 200ms Fade-Out

modulated_sound[:len(fade_in)] *= fade_in  # Anfang des Sounds leiser machen
modulated_sound[-len(fade_out):] *= fade_out  # Ende des Sounds weicher ausklingen lassen

# Normieren der Amplitude auf den Bereich für WAV-Dateien
modulated_sound = (modulated_sound * 32767).astype(np.int16)

# Speichern des Sounds als WAV-Datei
with wave.open("futuristic_success_sound.wav", "w") as wf:
    wf.setnchannels(1)  # Mono-Sound
    wf.setsampwidth(2)  # 16-Bit PCM
    wf.setframerate(samplerate)  # Abtastrate
    wf.writeframes(modulated_sound.tobytes())  # Speichern

print("Sound gespeichert als 'futuristic_success_sound.wav'")
