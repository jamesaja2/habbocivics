import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HabboAvatar } from "../components/HabboAvatar";
import { HabboFrank } from "../components/HabboFrank";
import { Sparkles } from "lucide-react";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // On-beat animations
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const avatarSlide = spring({
    frame: frame - 40,
    fps,
    config: { damping: 14 },
  });

  const frankSlide = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14 },
  });

  // Pulse to the beat
  const beatPulse = 1 + Math.sin(frame * 0.4) * 0.02;

  return (
    <div className="relative w-full h-full bg-[#132231] overflow-hidden flex flex-col items-center justify-between p-12 scanlines select-none">
      {/* Background Retro Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

      {/* Top Header Tag */}
      <div className="relative z-10 flex items-center gap-3 bg-black/60 border-2 border-amber-400 px-6 py-2 rounded-full shadow-lg">
        <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
        <span className="font-pixel text-amber-300 text-sm tracking-wider uppercase">
          PROJECT PENDIDIKAN PANCASILA • KELAS XII B2
        </span>
      </div>

      {/* Center Hero Title */}
      <div
        style={{
          transform: `scale(${logoScale * beatPulse})`,
        }}
        className="relative z-10 flex flex-col items-center text-center my-auto"
      >
        {/* Habbo Gold Logo Badge */}
        <div className="habbo-logo-badge mb-4 text-2xl font-pixel px-8 py-2">
          HABBO CIVICS
        </div>

        <h1 className="text-6xl font-black text-white tracking-wide font-sans drop-shadow-[0_8px_0_#000] mb-3">
          MISI: AGEN KEWARGANEGARAAN
        </h1>

        <div
          style={{ opacity: subtitleOpacity }}
          className="bg-amber-400 text-slate-950 font-pixel text-lg font-bold px-6 py-2 rounded-lg border-3 border-black shadow-[0_6px_0_#000]"
        >
          PELANGGARAN HAK &amp; PENGINGKARAN KEWAJIBAN WARGA NEGARA
        </div>
      </div>

      {/* Character Avatars: Student Agent and Inspector Frank */}
      <div className="relative z-10 w-full flex items-end justify-between px-16">
        {/* Left: Player Agent Avatar */}
        <div
          style={{
            transform: `translateX(${(1 - avatarSlide) * -300}px)`,
            opacity: avatarSlide,
          }}
          className="flex flex-col items-center"
        >
          <HabboAvatar
            scale={2.2}
            walking={frame < 120}
            waving={frame >= 120}
            name="AGEN PANCASILA"
          />
        </div>

        {/* Right: Inspector Frank with speech bubble */}
        <div
          style={{
            transform: `translateX(${(1 - frankSlide) * 300}px)`,
            opacity: frankSlide,
          }}
        >
          <HabboFrank
            scale={1.3}
            speechText="Selamat datang, Agen Muda! Bersiaplah menyelidiki kasus nyata di kota!"
          />
        </div>
      </div>

      {/* Bottom Voiceover Caption Bar */}
      <div className="relative z-20 w-full max-w-4xl bg-black/85 border-3 border-black rounded-xl p-3.5 text-center shadow-2xl">
        <div className="text-xs font-pixel text-amber-400 mb-0.5">
          🎙️ VOICE OVER (BAHASA INDONESIA):
        </div>
        <p className="text-base font-bold text-white font-sans">
          "Halo Agen Pancasila! Selamat datang di Habbo Civics. Game petualangan edukasi seru bertema Pendidikan Pancasila dengan gaya retro pixel art khas Habbo Hotel!"
        </p>
      </div>
    </div>
  );
};
