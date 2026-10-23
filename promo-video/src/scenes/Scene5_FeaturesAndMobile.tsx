import React from "react";
import { useCurrentFrame } from "remotion";
import {
  Smartphone,
  Music,
  Compass,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export const Scene5_FeaturesAndMobile: React.FC = () => {
  const frame = useCurrentFrame();

  // Equalizer heights
  const bars = [0.8, 0.4, 0.9, 0.6, 0.3, 0.7, 0.9, 0.5, 0.8, 0.4];

  return (
    <div className="relative w-full h-full bg-[#111e2b] overflow-hidden flex flex-col justify-between p-12 scanlines select-none">
      {/* Top Header */}
      <div className="relative z-20 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="habbo-logo-badge text-sm font-pixel">FITUR LENGKAP</div>
          <h2 className="text-4xl font-black text-white font-sans drop-shadow-md">
            PANDUAN TOUR, CHIPTUNE &amp; MOBILE D-PAD
          </h2>
        </div>

        <div className="bg-cyan-500 border-2 border-black text-slate-950 px-5 py-1.5 rounded-full font-pixel text-xs font-bold shadow-md flex items-center gap-2">
          <Smartphone className="w-4 h-4" />
          <span>100% RAMAH PONSEL &amp; DESKTOP</span>
        </div>
      </div>

      {/* Main Showcase Grid */}
      <div className="relative z-10 grid grid-cols-12 gap-8 my-auto items-center">
        {/* Card 1: Interactive Onboarding Tour */}
        <div className="col-span-4 bg-white border-4 border-black rounded-2xl p-5 shadow-[0_8px_0_#000] space-y-3">
          <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
            <Compass className="w-6 h-6 text-amber-500" />
            <h3 className="font-pixel text-xs font-bold text-slate-900">
              PANDUAN TOUR BERTINGKAT
            </h3>
          </div>
          <p className="text-xs text-slate-700 font-sans leading-relaxed">
            Panduan 5 langkah onboarding interaktif ramah pemula, menjelaskan kontrol, investigasi kasus, hingga navigasi zona misi.
          </p>
          <div className="bg-amber-100 border-2 border-amber-400 rounded-lg p-2.5 text-[11px] font-bold text-amber-900 font-pixel">
            🚀 OTOMATIS TERSIMPAN DI BROWSER
          </div>
        </div>

        {/* Card 2: Chiptune Retro Audio Engine */}
        <div className="col-span-4 bg-[#1e293b] border-4 border-black rounded-2xl p-5 shadow-[0_8px_0_#000] text-white space-y-3 text-center">
          <div className="flex items-center justify-center gap-2 border-b-2 border-slate-700 pb-2">
            <Music className="w-5 h-5 text-yellow-400" />
            <h3 className="font-pixel text-xs font-bold text-yellow-400">
              MUSIK CHIPTUNE RETRO 8-BIT
            </h3>
          </div>

          {/* Equalizer Visualizer */}
          <div className="h-20 flex items-end justify-center gap-2 bg-black/40 border-2 border-black rounded-xl p-3">
            {bars.map((b, i) => {
              const h = Math.abs(Math.sin(frame * 0.3 + i * 0.8)) * 100 * b;
              return (
                <div
                  key={i}
                  style={{ height: `${Math.max(12, h)}%` }}
                  className="w-3.5 bg-gradient-to-t from-emerald-500 via-amber-400 to-rose-500 rounded-t-sm"
                />
              );
            })}
          </div>

          <p className="text-xs text-slate-300 font-sans">
            Efek suara autentik Nintendo/NES &amp; synth chiptune bawaan.
          </p>
        </div>

        {/* Card 3: Mobile Frame Mockup with Virtual D-Pad */}
        <div className="col-span-4 bg-gradient-to-b from-slate-900 to-slate-800 border-4 border-black rounded-2xl p-5 shadow-[0_8px_0_#000] text-white flex flex-col items-center space-y-3">
          <div className="flex items-center gap-2 font-pixel text-xs text-cyan-300">
            <Smartphone className="w-5 h-5" />
            <span>VIRTUAL TOUCH D-PAD</span>
          </div>

          {/* D-Pad Simulation */}
          <div className="bg-black/60 p-3 rounded-2xl border-2 border-white/20 flex flex-col items-center">
            <button className="w-9 h-9 bg-amber-400 border-2 border-black rounded-lg flex items-center justify-center text-black">
              <ArrowUp className="w-5 h-5" />
            </button>
            <div className="flex gap-2 my-1">
              <button className="w-9 h-9 bg-amber-400 border-2 border-black rounded-lg flex items-center justify-center text-black">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-9 h-9 flex items-center justify-center text-[9px] font-pixel text-amber-200">
                DPAD
              </div>
              <button className="w-9 h-9 bg-amber-400 border-2 border-black rounded-lg flex items-center justify-center text-black">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <button className="w-9 h-9 bg-amber-400 border-2 border-black rounded-lg flex items-center justify-center text-black">
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>

          <p className="text-[11px] text-slate-300 font-sans text-center">
            Sentuh ubin isometrik atau gunakan D-Pad di HP/Tablet!
          </p>
        </div>
      </div>

      {/* Bottom Voiceover Caption */}
      <div className="relative z-20 w-full max-w-4xl mx-auto bg-black/85 border-3 border-black rounded-xl p-3.5 text-center shadow-2xl">
        <div className="text-xs font-pixel text-amber-400 mb-0.5">
          🎙️ VOICE OVER (BAHASA INDONESIA):
        </div>
        <p className="text-base font-bold text-white font-sans">
          "Dilengkapi panduan tour interaktif, musik chiptune retro delapan bit, dan kontrol sentuh D-Pad responsif di smartphone kamu!"
        </p>
      </div>
    </div>
  );
};
