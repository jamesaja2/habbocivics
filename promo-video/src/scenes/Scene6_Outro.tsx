import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HabboAvatar } from "../components/HabboAvatar";
import { Trophy, Globe } from "lucide-react";

export const Scene6_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const urlSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, stiffness: 140 },
  });

  const creditsSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14 },
  });

  // Confetti particles
  const confettiColors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#ec4899", "#8b5cf6"];

  return (
    <div className="relative w-full h-full bg-[#0d1824] overflow-hidden flex flex-col justify-between p-10 scanlines select-none items-center text-center">
      {/* Animated Confetti Rain */}
      {Array.from({ length: 30 }).map((_, i) => {
        const fallProgress = ((frame * 6 + i * 45) % 1100);
        const xPos = (i * 64) % 1920;
        const rot = frame * 4 + i * 20;
        const color = confettiColors[i % confettiColors.length];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${xPos}px`,
              top: `${fallProgress - 100}px`,
              transform: `rotate(${rot}deg)`,
              backgroundColor: color,
            }}
            className="w-4 h-2.5 rounded-sm shadow"
          />
        );
      })}

      {/* Top Badge */}
      <div className="relative z-10 flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 border-3 border-black text-slate-950 px-6 py-2 rounded-full font-pixel text-xs font-black shadow-lg">
        <Trophy className="w-5 h-5" />
        <span>GELAR KEHORMATAN: DUTA LUHUR PANCASILA 🌟</span>
      </div>

      {/* Center Grand Card */}
      <div
        style={{
          transform: `scale(${titleSpring})`,
        }}
        className="relative z-10 flex flex-col items-center my-auto"
      >
        <div className="habbo-logo-badge text-2xl font-pixel mb-2 px-8 py-2">
          HABBO CIVICS
        </div>

        <h1 className="text-5xl font-black text-white tracking-wide font-sans drop-shadow-[0_8px_0_#000] mb-2">
          AGEN PANCASILA NUSANTARA
        </h1>

        <p className="text-lg font-bold text-amber-300 font-pixel mb-4">
          Belajar Hak &amp; Kewajiban Warga Negara Jadi Menyenangkan!
        </p>

        {/* Official Production URL Showcase */}
        <div
          style={{
            transform: `scale(${Math.max(0, urlSpring)})`,
          }}
          className="bg-[#122232] border-4 border-amber-400 rounded-2xl px-8 py-3.5 shadow-[0_8px_0_#000] flex items-center gap-5 my-1"
        >
          <div className="bg-amber-400 p-2.5 rounded-xl border-2 border-black">
            <Globe className="w-8 h-8 text-black" />
          </div>

          <div className="text-left">
            <div className="text-[11px] font-pixel text-amber-300 uppercase tracking-widest">
              WEBSITE RESMI (PRODUCTION):
            </div>
            <div className="text-3xl font-pixel font-black text-cyan-300 tracking-wider drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">
              https://habbocivics.byjames.id/
            </div>
          </div>

          <div className="bg-emerald-500 text-white font-pixel text-xs px-4 py-2.5 rounded-xl border-2 border-black font-bold animate-pulse shadow-md">
            KLIK &amp; MAINKAN SEKARANG 🚀
          </div>
        </div>
      </div>

      {/* Dancing Avatars & Student Credits */}
      <div className="relative z-10 w-full flex items-end justify-around px-24">
        <HabboAvatar
          scale={2.1}
          dancing={true}
          shirtColor="#2563eb"
          name="AGEN KARLA"
        />

        {/* Student Credits Box */}
        <div
          style={{
            transform: `scale(${creditsSpring})`,
            opacity: creditsSpring,
          }}
          className="bg-black/90 border-4 border-amber-400 rounded-2xl px-6 py-3 shadow-2xl max-w-xl text-center"
        >
          <div className="text-[10px] font-pixel text-slate-400 uppercase tracking-widest mb-1">
            CREATOR &amp; DEVELOPER:
          </div>
          <div className="text-base sm:text-lg font-pixel font-black text-[#ffcf4d] tracking-wide leading-relaxed">
            James Timothy (XII B2/17)
            <br />
            &amp; Karla Jessica Hartono (XII B2/23)
          </div>
          <div className="text-xs text-slate-300 font-sans mt-1">
            SMA • Project Pendidikan Pancasila (PPKN)
          </div>
        </div>

        <HabboAvatar
          scale={2.1}
          dancing={true}
          shirtColor="#dc2626"
          name="AGEN JAMES"
        />
      </div>

      {/* Bottom Voiceover Caption */}
      <div className="relative z-20 w-full max-w-4xl bg-black/85 border-3 border-black rounded-xl p-3 text-center shadow-2xl mt-3">
        <div className="text-xs font-pixel text-amber-400 mb-0.5">
          🎙️ VOICE OVER (BAHASA INDONESIA):
        </div>
        <p className="text-base font-bold text-white font-sans">
          "Kunjungi dan mainkan sekarang juga di https://habbocivics.byjames.id/! Karya James Timothy dan Karla Jessica Hartono, kelas XII B2!"
        </p>
      </div>
    </div>
  );
};
