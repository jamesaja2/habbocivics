import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  Flame,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  ShieldAlert,
  Zap,
} from "lucide-react";

export const Scene3_RealisticCases: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const modalSlide = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  return (
    <div className="relative w-full h-full bg-[#1b2b3a] overflow-hidden flex flex-col justify-between p-12 scanlines select-none">
      {/* Top Header */}
      <div className="relative z-20 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="habbo-logo-badge text-sm font-pixel">INVESTIGASI</div>
          <h2 className="text-4xl font-black text-white font-sans drop-shadow-md">
            20 KASUS NYATA &amp; VISUALISASI REALISTIS
          </h2>
        </div>

        <div className="bg-rose-500 border-2 border-black text-white px-4 py-1.5 rounded-full font-pixel text-xs font-bold shadow-md flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-300" />
          <span>DASAR HUKUM UUD 1945 &amp; PANCASILA</span>
        </div>
      </div>

      {/* Main Grid: Left Animated Case Demos, Right Habbo Modal Window */}
      <div className="relative z-10 grid grid-cols-12 gap-8 my-auto items-center">
        {/* Left: 4 Realistic Artwork Highlights */}
        <div className="col-span-5 grid grid-cols-2 gap-4">
          {/* Card 1: Api Karhutla */}
          <div className="bg-[#121c26] border-3 border-black rounded-xl p-3.5 flex flex-col items-center shadow-lg relative overflow-hidden">
            <div className="text-[10px] font-pixel text-amber-300 mb-1 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>API KARHUTLA</span>
            </div>
            {/* Animated Flame */}
            <div className="h-24 w-full flex items-end justify-center relative">
              {/* Smoke */}
              <div
                style={{
                  transform: `translateY(-${(frame % 30) * 1.5}px)`,
                  opacity: 1 - (frame % 30) / 30,
                }}
                className="absolute w-8 h-8 rounded-full bg-stone-700 top-2"
              />
              <div
                style={{
                  height: `${50 + Math.sin(frame * 0.7) * 12}px`,
                }}
                className="w-12 bg-red-600 rounded-t-full flex items-end justify-center"
              >
                <div
                  style={{
                    height: `${32 + Math.cos(frame * 0.9) * 8}px`,
                  }}
                  className="w-7 bg-orange-400 rounded-t-full flex items-end justify-center"
                >
                  <div className="w-3 h-4 bg-yellow-200 rounded-t-full" />
                </div>
              </div>
            </div>
            <div className="mt-2 text-xs font-bold text-slate-300 text-center">
              Lidah Api &amp; Asap Mengepul
            </div>
          </div>

          {/* Card 2: Lampu Korsleting */}
          <div className="bg-[#121c26] border-3 border-black rounded-xl p-3.5 flex flex-col items-center shadow-lg">
            <div className="text-[10px] font-pixel text-cyan-300 mb-1 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>LAMPU JALAN</span>
            </div>
            <div className="h-24 flex items-center justify-center relative">
              <div className="w-3 h-20 bg-slate-700 border border-black" />
              <div
                className={`absolute top-2 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center ${
                  Math.sin(frame * 0.6) > 0.2
                    ? "bg-yellow-300 shadow-[0_0_16px_#fde047]"
                    : "bg-red-600"
                }`}
              >
                ⚡
              </div>
            </div>
            <div className="mt-2 text-xs font-bold text-slate-300 text-center">
              Percikan Korsleting Listrik
            </div>
          </div>

          {/* Card 3: Coretan Vandalisme */}
          <div className="bg-[#121c26] border-3 border-black rounded-xl p-3.5 flex flex-col items-center shadow-lg">
            <div className="text-[10px] font-pixel text-pink-300 mb-1">
              VANDALISME
            </div>
            <div className="h-24 w-full bg-slate-800 border-2 border-black rounded flex flex-col items-center justify-center relative overflow-hidden">
              <div className="text-pink-500 font-extrabold text-lg tracking-widest font-pixel">
                VANDAL!
              </div>
              <div className="flex gap-3 mt-1">
                <div className="w-1 h-6 bg-pink-500 rounded" />
                <div className="w-1 h-8 bg-pink-500 rounded" />
                <div className="w-1 h-5 bg-pink-500 rounded" />
              </div>
            </div>
            <div className="mt-2 text-xs font-bold text-slate-300 text-center">
              Coretan Dinding &amp; Lelehan Cat
            </div>
          </div>

          {/* Card 4: Limbah Kimia */}
          <div className="bg-[#121c26] border-3 border-black rounded-xl p-3.5 flex flex-col items-center shadow-lg">
            <div className="text-[10px] font-pixel text-emerald-300 mb-1">
              LIMBAH SUNGAI
            </div>
            <div className="h-24 w-full flex items-center justify-center relative">
              <div className="w-10 h-16 bg-amber-900 border-2 border-black rounded relative flex items-center justify-center">
                <div className="text-[9px] font-bold text-yellow-300">☣ B3</div>
              </div>
              <div className="w-16 h-4 bg-emerald-400 rounded-full absolute bottom-1 -right-2 opacity-80" />
            </div>
            <div className="mt-2 text-xs font-bold text-slate-300 text-center">
              Limbah Beracun &amp; Gas
            </div>
          </div>
        </div>

        {/* Right: Retro Habbo Case Modal Pop-up */}
        <div
          style={{
            transform: `scale(${modalSlide})`,
            opacity: modalSlide,
          }}
          className="col-span-7 habbo-window max-w-xl mx-auto shadow-2xl"
        >
          {/* Modal Titlebar */}
          <div className="habbo-titlebar">
            <div className="flex items-center gap-2">
              <span className="habbo-logo-badge text-xs font-pixel py-1">
                HABBO CIVICS
              </span>
              <span className="font-pixel text-xs font-bold text-slate-900">
                DOKUMEN KASUS #01
              </span>
            </div>
            <div className="w-6 h-6 rounded-full bg-red-600 border-2 border-black flex items-center justify-center text-white text-xs font-bold">
              ✕
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 space-y-3 bg-[#eef6fb]">
            <div className="bg-white border-2 border-black rounded-lg p-3">
              <div className="text-[9px] font-pixel text-slate-500">
                LAPORAN INVESTIGASI LINGKUNGAN
              </div>
              <h3 className="text-xl font-black text-slate-900 font-sans">
                Kasus: Pembakaran Hutan &amp; Lahan (Karhutla)
              </h3>
            </div>

            {/* Badges */}
            <div className="flex gap-2">
              <span className="bg-gradient-to-r from-orange-500 to-amber-600 text-white font-pixel text-xs px-3 py-1 rounded border-2 border-black font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Pengingkaran Kewajiban Warga Negara
              </span>
              <span className="bg-blue-100 text-blue-900 font-bold text-xs px-3 py-1 rounded border-2 border-blue-400">
                ⭐ Sila ke-2 &amp; ke-3
              </span>
            </div>

            {/* Dasar Hukum */}
            <div className="bg-amber-100 border-2 border-amber-400 rounded-lg p-2.5 text-xs text-amber-950 font-medium">
              <div className="font-bold flex items-center gap-1.5 text-amber-900 mb-0.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Dasar Hukum Konstitusi:</span>
              </div>
              Pasal 28H ayat (1) UUD 1945 &amp; UU No. 32 Tahun 2009 tentang PPLH.
            </div>

            {/* Gagasan Solutif */}
            <div className="bg-emerald-100 border-2 border-emerald-500 rounded-lg p-2.5 text-xs text-emerald-950">
              <div className="font-bold flex items-center gap-1.5 text-emerald-900 mb-0.5 font-pixel">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>GAGASAN SOLUTIF PANCASILA:</span>
              </div>
              Pencabutan izin korporasi, satelit hotspot real-time, dan edukasi Pembukaan Lahan Tanpa Bakar (PLTB).
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Voiceover Caption */}
      <div className="relative z-20 w-full max-w-4xl mx-auto bg-black/85 border-3 border-black rounded-xl p-3.5 text-center shadow-2xl">
        <div className="text-xs font-pixel text-amber-400 mb-0.5">
          🎙️ VOICE OVER (BAHASA INDONESIA):
        </div>
        <p className="text-base font-bold text-white font-sans">
          "Selidiki dua puluh kasus nyata pelanggaran hak dan pengingkaran kewajiban, lengkap dengan visualisasi api berkobar, kepulan asap, dan coretan grafiti!"
        </p>
      </div>
    </div>
  );
};
