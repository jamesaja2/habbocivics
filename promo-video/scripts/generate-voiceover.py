import asyncio
import os
import edge_tts

VOICE = "id-ID-ArdiNeural"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 6 scene voiceover segments
SCRIPTS = [
    {
        "id": "vo_scene1",
        "text": "Pernah bayangkan belajar Pendidikan Pancasila di dunia virtual retro Habbo Hotel? Sambutlah: Misi Agen Kewarganegaraan!",
        "rate": "+10%",
        "pitch": "+0Hz"
    },
    {
        "id": "vo_scene2",
        "text": "Jelajahi lima zona misi isometrik! Dari Taman Kota, Hutan Lindung Tropis, Ruang Siber, Sekolah Pancasila, hingga Balai Layanan Publik!",
        "rate": "+12%",
        "pitch": "+0Hz"
    },
    {
        "id": "vo_scene3",
        "text": "Selidiki dua puluh kasus nyata pelanggaran hak dan pengingkaran kewajiban berdasarkan UUD 1945! Dilengkapi animasi kobaran api karhutla, vandalisme coretan liar, hingga lampu jalan pecah!",
        "rate": "+10%",
        "pitch": "+0Hz"
    },
    {
        "id": "vo_scene4",
        "text": "Bukan sekadar membaca! Uji kemampuan analisismu lewat Tantangan Kuis Detektif di setiap kasus untuk memecahkan misteri dan membuktikan pemahamanmu!",
        "rate": "+10%",
        "pitch": "+0Hz"
    },
    {
        "id": "vo_scene5",
        "text": "Dilengkapi panduan tur interaktif, alunan musik chiptune retro, dan kontrol virtual d-pad ramah ponsel!",
        "rate": "+10%",
        "pitch": "+0Hz"
    },
    {
        "id": "vo_scene6",
        "text": "Jadilah Duta Luhur Pancasila sekarang juga! Karya James Timothy dan Karla Jessica Hartono.",
        "rate": "+8%",
        "pitch": "+0Hz"
    }
]

async def generate():
    for item in SCRIPTS:
        out_path = os.path.join(OUTPUT_DIR, f"{item['id']}.mp3")
        print(f"Generating {item['id']}...")
        communicate = edge_tts.Communicate(item["text"], VOICE, rate=item["rate"], pitch=item["pitch"])
        await communicate.save(out_path)
        print(f"Saved to {out_path}")

if __name__ == "__main__":
    asyncio.run(generate())
