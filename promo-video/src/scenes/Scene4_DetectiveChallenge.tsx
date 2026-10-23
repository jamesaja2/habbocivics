import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  Sparkles,
  CheckCircle2,
  Award,
  MousePointer,
} from "lucide-react";

export const Scene4_DetectiveChallenge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Answer selection triggered at frame 70
  const isSelected = frame >= 70;

  // Cursor movement
  const cursorX = interpolate(frame, [20, 70], [800, 480], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorY = interpolate(frame, [20, 70], [600, 320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const successSpring = spring({
    frame: frame - 75,
    fps,
    config: { damping: 10, stiffness: 140 },
  });

  // Progress counter animation
  const progressCount = Math.min(
    4,
    Math.floor(
      interpolate(frame, [30, 200], [0, 4], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    )
  );

  return (
    <div className="relative w-full h-full bg-[#172331] overflow-hidden flex flex-col justify-between p-12 scanlines select-none">
      {/* Top Header */}
      <div className="relative z-20 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="habbo-logo-badge text-sm font-pixel">CHALLENGE</div>
          <h2 className="text-4xl font-black text-white font-sans drop-shadow-md">
            TANTANGAN KUIS ANALISIS DETEKTIF
          </h2>
        </div>

        <div className="bg-amber-400 border-2 border-black text-slate-950 px-5 py-1.5 rounded-full font-pixel text-xs font-bold shadow-md flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-900" />
          <span>INTERAKTIF &amp; BERBOBOT</span>
        </div>
      </div>

      {/* Main Content: Left Quiz Card, Right Gamification Meter */}
      <div className="relative z-10 grid grid-cols-12 gap-8 my-auto items-center">
        {/* Left: Interactive Quiz Card */}
        <div className="col-span-8 habbo-window shadow-2xl">
          <div className="habbo-titlebar bg-gradient-to-r from-amber-300 to-amber-500">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" />
                UJI ANALISIS HUKUM &amp; PANCASILA
              </span>
            </div>
            <span className="bg-rose-600 text-white text-[10px] font-pixel px-2 py-0.5 rounded border border-black font-bold">
              KUIS KASUS
            </span>
          </div>

          <div className="p-6 bg-white space-y-4">
            <div className="text-xs font-pixel text-blue-600 uppercase">
              PERTANYAAN INVESTIGASI:
            </div>
            <h3 className="text-xl font-bold text-slate-900 leading-snug">
              Mengapa membuang sampah sembarangan dikategorikan sebagai Pengingkaran Kewajiban Warga Negara?
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              <div
                className={`p-3.5 border-3 rounded-xl transition-all flex items-center gap-3.5 ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-100 shadow-[0_4px_0_#059669] scale-[1.02]"
                    : "border-slate-300 bg-slate-50"
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-md border-2 border-black flex items-center justify-center font-pixel text-xs font-bold ${
                    isSelected ? "bg-emerald-600 text-white" : "bg-white text-slate-800"
                  }`}
                >
                  {isSelected ? "✓" : "A"}
                </span>
                <span className="text-sm font-bold text-slate-900 font-sans">
                  Melanggar kewajiban menjaga lingkungan &amp; merampas hak orang lain atas lingkungan bersih (Pasal 28H UUD 1945)
                </span>
              </div>

              <div className="p-3 border-2 border-slate-200 bg-slate-50 rounded-xl flex items-center gap-3 opacity-60">
                <span className="w-7 h-7 rounded-md border-2 border-black bg-white flex items-center justify-center font-pixel text-xs font-bold text-slate-800">
                  B
                </span>
                <span className="text-xs text-slate-700 font-sans">
                  Hanya masalah estetika kota tanpa kaitan hak asasi
                </span>
              </div>

              <div className="p-3 border-2 border-slate-200 bg-slate-50 rounded-xl flex items-center gap-3 opacity-60">
                <span className="w-7 h-7 rounded-md border-2 border-black bg-white flex items-center justify-center font-pixel text-xs font-bold text-slate-800">
                  C
                </span>
                <span className="text-xs text-slate-700 font-sans">
                  Warga bebas membuang sampah jika belum ada petugas
                </span>
              </div>
            </div>

            {/* Triumphant Feedback Popup */}
            {isSelected && (
              <div
                style={{
                  transform: `scale(${successSpring})`,
                  opacity: successSpring,
                }}
                className="bg-emerald-500 border-3 border-black rounded-xl p-3 text-white flex items-center justify-between shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-yellow-300" />
                  <span className="font-pixel text-xs font-bold text-white">
                    ANALISIS TEPAT! KASUS TERPECAHKAN 🎉 (+100 XP)
                  </span>
                </div>
                <button className="pixel-btn-yellow px-3 py-1 rounded text-xs font-pixel font-bold">
                  SELESAI ✓
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Gamification Score & Progress */}
        <div className="col-span-4 space-y-4">
          <div className="bg-[#121c26] border-4 border-black rounded-2xl p-5 shadow-[0_8px_0_#000] text-center space-y-3">
            <div className="w-16 h-16 bg-amber-400 border-3 border-black rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-md">
              🏆
            </div>

            <div className="font-pixel text-xs text-amber-300">
              PROGRES PENYELIDIKAN
            </div>

            <div className="text-5xl font-black text-white font-mono">
              {progressCount} / 4
            </div>
            <div className="text-xs font-bold text-emerald-400">
              KASUS TERIDENTIFIKASI
            </div>

            {/* Segmented bar */}
            <div className="w-full h-6 bg-slate-800 border-2 border-black rounded p-1 flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded ${
                    i < progressCount
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-[0_0_8px_#34d399]"
                      : "bg-slate-700/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animated Cursor */}
      {!isSelected && (
        <div
          style={{
            position: "absolute",
            left: `${cursorX}px`,
            top: `${cursorY}px`,
            zIndex: 50,
          }}
          className="pointer-events-none drop-shadow-xl"
        >
          <MousePointer className="w-10 h-10 text-white fill-black stroke-white" />
        </div>
      )}

      {/* Bottom Voiceover Caption */}
      <div className="relative z-20 w-full max-w-4xl mx-auto bg-black/85 border-3 border-black rounded-xl p-3.5 text-center shadow-2xl">
        <div className="text-xs font-pixel text-amber-400 mb-0.5">
          🎙️ VOICE OVER (BAHASA INDONESIA):
        </div>
        <p className="text-base font-bold text-white font-sans">
          "Pecahkan tantangan kuis detektif berlandaskan pasal-pasal UUD 1945 dengan analisis hukum dan verifikasi instan!"
        </p>
      </div>
    </div>
  );
};
