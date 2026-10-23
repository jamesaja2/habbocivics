import React from "react";
import { useCurrentFrame } from "remotion";

interface Props {
  preset: "park" | "forest" | "cyber" | "school" | "civic";
  showHotspots?: boolean;
}

export const IsometricRoomPreview: React.FC<Props> = ({
  preset = "park",
  showHotspots = true,
}) => {
  const frame = useCurrentFrame();

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Isometric Floor Diamond */}
      <div
        style={{
          transform: "rotateX(60deg) rotateZ(-45deg)",
          transformStyle: "preserve-3d",
        }}
        className="relative w-[600px] h-[600px] shadow-2xl"
      >
        {/* Floor Tiles Grid */}
        <div className="w-full h-full grid grid-cols-6 grid-rows-6 border-4 border-black">
          {Array.from({ length: 36 }).map((_, i) => {
            const row = Math.floor(i / 6);
            const col = i % 6;
            const isCheck = (row + col) % 2 === 0;

            let tileBg = isCheck ? "#78b871" : "#86c87f";
            if (preset === "forest") tileBg = isCheck ? "#3f6212" : "#4d7c0f";
            if (preset === "cyber") tileBg = isCheck ? "#0f172a" : "#1e293b";
            if (preset === "school") tileBg = isCheck ? "#d97706" : "#b45309";
            if (preset === "civic") tileBg = isCheck ? "#f1f5f9" : "#e2e8f0";

            return (
              <div
                key={i}
                style={{ backgroundColor: tileBg }}
                className="border border-black/30 relative"
              />
            );
          })}
        </div>

        {/* Back Wall Left */}
        <div
          style={{
            transform: "rotateY(90deg) translateZ(0px) translateY(-140px) translateX(-140px)",
            width: "600px",
            height: "140px",
          }}
          className={`absolute top-0 left-0 border-4 border-black ${
            preset === "cyber"
              ? "bg-[#1e1b4b]"
              : preset === "school"
              ? "bg-[#fde047]"
              : preset === "forest"
              ? "bg-[#65a30d]"
              : "bg-[#94a3b8]"
          }`}
        >
          {preset === "park" && (
            <div className="absolute top-4 left-10 text-pink-500 font-extrabold text-xl tracking-widest font-pixel">
              VANDAL!
            </div>
          )}
          {preset === "school" && (
            <div className="absolute top-4 left-12 bg-[#064e3b] text-yellow-300 px-4 py-1.5 border-2 border-black font-pixel text-xs font-bold">
              GARUDA PANCASILA &amp; UUD 1945
            </div>
          )}
        </div>

        {/* Back Wall Right */}
        <div
          style={{
            transform: "rotateX(-90deg) translateZ(0px) translateY(-140px) translateX(0px)",
            width: "600px",
            height: "140px",
          }}
          className={`absolute top-0 left-0 border-4 border-black ${
            preset === "cyber"
              ? "bg-[#312e81]"
              : preset === "school"
              ? "bg-[#eab308]"
              : preset === "forest"
              ? "bg-[#4d7c0f]"
              : "bg-[#64748b]"
          }`}
        />
      </div>

      {/* 3D Elements placed above isometric floor */}
      {/* 1. Realistic Animated Fire in Forest */}
      {preset === "forest" && (
        <div className="absolute top-1/2 left-1/2 -translate-x-12 -translate-y-16 flex flex-col items-center">
          {/* Billowing Smoke particles */}
          {Array.from({ length: 3 }).map((_, s) => {
            const smokeT = ((frame * 0.08 + s * 0.33) % 1);
            const smokeY = -smokeT * 70;
            const smokeX = Math.sin(smokeT * 6 + s) * 20;
            const smokeScale = 0.5 + smokeT * 1.5;
            const smokeAlpha = (1 - smokeT) * 0.7;
            return (
              <div
                key={s}
                style={{
                  transform: `translate(${smokeX}px, ${smokeY}px) scale(${smokeScale})`,
                  opacity: smokeAlpha,
                }}
                className="absolute w-8 h-8 rounded-full bg-slate-800"
              />
            );
          })}

          {/* Flickering Flames */}
          <div className="relative flex items-end justify-center">
            <div
              style={{
                height: `${40 + Math.sin(frame * 0.8) * 12}px`,
              }}
              className="w-10 bg-red-600 rounded-t-full relative flex items-end justify-center"
            >
              <div
                style={{
                  height: `${28 + Math.cos(frame * 0.9) * 8}px`,
                }}
                className="w-6 bg-orange-500 rounded-t-full flex items-end justify-center"
              >
                <div
                  style={{
                    height: `${16 + Math.sin(frame * 1.2) * 6}px`,
                  }}
                  className="w-3 bg-yellow-300 rounded-t-full"
                />
              </div>
            </div>
          </div>
          <div className="w-16 h-4 bg-stone-900 rounded-full -mt-1" />
        </div>
      )}

      {/* 2. Trash Pile in Park */}
      {preset === "park" && (
        <div className="absolute top-1/2 left-1/3 -translate-y-8 flex flex-col items-center">
          <div className="relative">
            <div className="w-10 h-7 bg-slate-800 rounded-full border-2 border-black" />
            <div className="w-8 h-6 bg-red-600 rounded-full border border-black absolute -top-2 left-3" />
            <div className="w-4 h-6 bg-cyan-400 border border-black absolute top-1 -left-2 rotate-45" />
          </div>
          {/* Buzzing flies */}
          {Array.from({ length: 3 }).map((_, f) => {
            const flyA = frame * 0.3 + f * 2.1;
            const fx = Math.cos(flyA) * 16;
            const fy = Math.sin(flyA) * 10 - 12;
            return (
              <div
                key={f}
                style={{ transform: `translate(${fx}px, ${fy}px)` }}
                className="w-1.5 h-1.5 bg-black rounded-full absolute"
              />
            );
          })}
        </div>
      )}

      {/* 3. Broken Streetlamp with Sparks in Park */}
      {preset === "park" && (
        <div className="absolute top-1/3 right-1/3 flex flex-col items-center">
          {/* Lamp post */}
          <div className="w-2.5 h-24 bg-slate-900 border border-black" />
          <div className="w-8 h-8 -mt-24 bg-slate-800 border-2 border-black rounded-t flex items-center justify-center">
            {/* Bulb & Electric Spark */}
            <div
              className={`w-4 h-4 rounded-full ${
                Math.sin(frame * 0.7) > 0.2 ? "bg-yellow-300 shadow-[0_0_12px_#fde047]" : "bg-red-500"
              }`}
            />
          </div>
        </div>
      )}

      {/* 4. Cyber Terminal in Cyber room */}
      {preset === "cyber" && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-16 flex flex-col items-center">
          <div className="w-24 h-16 bg-slate-900 border-2 border-cyan-400 rounded-lg p-1.5 flex flex-col justify-between shadow-[0_0_20px_#06b6d4]">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-[8px] font-pixel text-cyan-300">ALERT: PDP LEAK</span>
            </div>
            <div className="text-[7px] font-mono text-emerald-400 truncate">
              01010011 01001111 01010011
            </div>
          </div>
          <div className="w-4 h-6 bg-slate-800 border border-black" />
        </div>
      )}

      {/* Hotspot Floating Pins */}
      {showHotspots && (
        <div className="absolute top-1/3 left-1/2 -translate-x-12 -translate-y-24">
          <div
            style={{
              transform: `translateY(${Math.sin(frame * 0.2) * 6}px)`,
            }}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-amber-400 border-3 border-black shadow-[0_0_16px_#f59e0b] flex items-center justify-center text-black font-extrabold text-lg">
              !
            </div>
            <div className="w-1 h-4 bg-black" />
          </div>
        </div>
      )}
    </div>
  );
};
