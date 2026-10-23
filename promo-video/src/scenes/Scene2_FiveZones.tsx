import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { IsometricRoomPreview } from "../components/IsometricRoomPreview";
import { Sparkles } from "lucide-react";

export const Scene2_FiveZones: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stages = [
    {
      id: "01",
      badge: "🌳",
      title: "Taman Kota & Fasilitas Umum",
      subtitle: "Vandalisme, Sampah, Lampu Jalan",
      color: "#22c55e",
      delay: 15,
    },
    {
      id: "02",
      badge: "🔥",
      title: "Hutan Tropis & Kelestarian Alam",
      subtitle: "Karhutla, Illegal Logging, Limbah Kimia",
      color: "#eab308",
      delay: 45,
    },
    {
      id: "03",
      badge: "💻",
      title: "Ruang Siber & Era Digital",
      subtitle: "Cyberbullying, Hoaks SARA, Doxing",
      color: "#06b6d4",
      delay: 75,
    },
    {
      id: "04",
      badge: "🎓",
      title: "Sekolah & Lingkungan Belajar",
      subtitle: "Perundungan Siswa, Diskriminasi Difabel",
      color: "#3b82f6",
      delay: 105,
    },
    {
      id: "05",
      badge: "⚖️",
      title: "Balai Layanan & Ketaatan Hukum",
      subtitle: "Pungutan Liar (Pungli), BPJS Darurat",
      color: "#a855f7",
      delay: 135,
    },
  ];

  // Current diorama cycling every 40 frames
  const dioramaIndex = Math.min(4, Math.floor(frame / 48));
  const presets: ("park" | "forest" | "cyber" | "school" | "civic")[] = [
    "park",
    "forest",
    "cyber",
    "school",
    "civic",
  ];

  return (
    <div className="relative w-full h-full bg-[#0f172a] overflow-hidden flex flex-col justify-between p-12 scanlines select-none">
      {/* Top Header */}
      <div className="relative z-20 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="habbo-logo-badge text-sm font-pixel">NAVIGATOR</div>
          <h2 className="text-4xl font-black text-white font-sans drop-shadow-md">
            5 ZONA MISI ISOMETRIK LENGKAP
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500 border-2 border-black px-4 py-1.5 rounded-full font-pixel text-xs text-black font-bold shadow-md">
          <Sparkles className="w-4 h-4" />
          <span>BEBAS PILIH • TANPA PERLU DATABASE</span>
        </div>
      </div>

      {/* Main Split: Left Cards List, Right 3D Isometric View */}
      <div className="relative z-10 grid grid-cols-12 gap-8 my-auto items-center">
        {/* Left: 5 Stage Cards that pop in on beat */}
        <div className="col-span-7 space-y-3">
          {stages.map((s, idx) => {
            const cardSpring = spring({
              frame: frame - s.delay,
              fps,
              config: { damping: 14, stiffness: 140 },
            });

            const isActive = dioramaIndex === idx;

            return (
              <div
                key={s.id}
                style={{
                  transform: `translateX(${(1 - cardSpring) * -120}px)`,
                  opacity: cardSpring,
                }}
                className={`border-3 border-black rounded-xl p-3.5 transition-all flex items-center justify-between gap-4 ${
                  isActive
                    ? "bg-amber-300 shadow-[0_6px_0_#000] scale-[1.03]"
                    : "bg-white/95 shadow-[0_3px_0_rgba(0,0,0,0.3)]"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    style={{ backgroundColor: s.color + "33" }}
                    className="w-12 h-12 rounded-lg border-2 border-black flex items-center justify-center text-2xl shrink-0"
                  >
                    {s.badge}
                  </div>
                  <div>
                    <div className="text-[10px] font-pixel text-slate-600 font-bold">
                      STAGE {s.id}
                    </div>
                    <div className="text-lg font-black text-slate-900 leading-tight">
                      {s.title}
                    </div>
                    <div className="text-xs text-slate-700 font-medium">
                      {s.subtitle}
                    </div>
                  </div>
                </div>

                <div className="bg-black/10 border border-black/20 px-3 py-1 rounded text-xs font-pixel font-bold">
                  4 KASUS
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Isometric Diorama Preview */}
        <div className="col-span-5 h-[420px] bg-[#162737] border-4 border-black rounded-2xl shadow-[0_10px_0_#000] relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-3 left-4 z-20 bg-black/70 border border-amber-400 px-3 py-1 rounded text-xs font-pixel text-amber-300">
            VIEW: {stages[dioramaIndex].title}
          </div>
          <IsometricRoomPreview
            preset={presets[dioramaIndex]}
            showHotspots={true}
          />
        </div>
      </div>

      {/* Bottom Voiceover Caption */}
      <div className="relative z-20 w-full max-w-4xl mx-auto bg-black/85 border-3 border-black rounded-xl p-3.5 text-center shadow-2xl">
        <div className="text-xs font-pixel text-amber-400 mb-0.5">
          🎙️ VOICE OVER (BAHASA INDONESIA):
        </div>
        <p className="text-base font-bold text-white font-sans">
          "Jelajahi lima zona misi isometrik interaktif tanpa database! Dari Taman Kota, Lingkungan Sekolah, Jalan Raya, Perbatasan Hutan, hingga Cyber Hub."
        </p>
      </div>
    </div>
  );
};
