import React from "react";
import { useCurrentFrame } from "remotion";

interface Props {
  speechText?: string;
  scale?: number;
}

export const HabboFrank: React.FC<Props> = ({ speechText, scale = 1 }) => {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame * 0.25) * 3;

  return (
    <div
      style={{ transform: `scale(${scale})` }}
      className="relative flex items-end gap-4 select-none"
    >
      {/* Frank Avatar Portrait */}
      <div
        style={{ transform: `translateY(${bob}px)` }}
        className="flex flex-col items-center shrink-0"
      >
        <div className="w-20 h-20 bg-gradient-to-b from-amber-300 to-amber-500 border-4 border-black rounded-2xl shadow-[0_6px_0_rgba(0,0,0,0.5)] flex items-center justify-center relative overflow-hidden">
          <div className="text-4xl">🕵️‍♂️</div>
          <div className="absolute top-1 right-1 bg-amber-400 border border-black rounded px-1 py-0.2 text-[8px] font-bold">
            ⭐
          </div>
        </div>

        <div className="mt-1.5 bg-black border border-amber-400 px-2 py-0.5 rounded text-[10px] font-pixel text-amber-300 tracking-tighter uppercase font-bold">
          INSP. FRANK
        </div>
      </div>

      {/* Speech Bubble */}
      {speechText && (
        <div className="habbo-speech-bubble max-w-md shadow-lg border-3 border-black relative">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-1 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-pixel text-[11px] font-bold text-slate-900 tracking-wider">
              DUTA PANCASILA
            </span>
          </div>
          <p className="text-sm font-bold text-slate-800 leading-snug font-sans">
            "{speechText}"
          </p>
        </div>
      )}
    </div>
  );
};
