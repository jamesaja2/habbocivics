import os
from gtts import gTTS

os.makedirs("promo-video/public/audio", exist_ok=True)

scripts = {
    "vo_scene1.mp3": "Halo Agen Pancasila! Selamat datang di Habbo Civics. Game petualangan edukasi seru bertema Pendidikan Pancasila dengan gaya retro pixel art khas Habbo Hotel!",
    "vo_scene2.mp3": "Jelajahi lima zona misi isometrik interaktif tanpa database! Dari Taman Kota, Lingkungan Sekolah, Jalan Raya, Perbatasan Hutan, hingga Cyber Hub.",
    "vo_scene3.mp3": "Selidiki dua puluh kasus nyata pelanggaran hak dan pengingkaran kewajiban, lengkap dengan visualisasi api berkobar, kepulan asap, dan coretan grafiti!",
    "vo_scene4.mp3": "Pecahkan tantangan kuis detektif berlandaskan pasal-pasal UUD 1945 dengan analisis hukum dan verifikasi instan!",
    "vo_scene5.mp3": "Dilengkapi panduan tour interaktif, musik chiptune retro delapan bit, dan kontrol sentuh D-Pad responsif di smartphone kamu!",
    "vo_scene6.mp3": "Kunjungi dan mainkan sekarang juga di habbocivics dot byjames dot id! Karya James Timothy dan Karla Jessica Hartono, kelas dua belas B dua!"
}

for filename, text in scripts.items():
    path = os.path.join("promo-video/public/audio", filename)
    print(f"Generating {filename} in native Indonesian: '{text[:40]}...'")
    tts = gTTS(text=text, lang="id", slow=False)
    tts.save(path)
    print(f"Saved: {path} ({os.path.getsize(path)} bytes)")

print("All Indonesian voiceover tracks generated successfully!")
