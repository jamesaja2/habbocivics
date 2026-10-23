import React from "react";
import { useCurrentFrame } from "remotion";

interface Props {
  scale?: number;
  facing?: "S" | "E" | "W";
  walking?: boolean;
  dancing?: boolean;
  waving?: boolean;
  shirtColor?: string;
  name?: string;
}

export const HabboAvatar: React.FC<Props> = ({
  scale = 1,
  facing = "S",
  walking = false,
  dancing = false,
  waving = false,
  shirtColor = "#2563eb",
  name,
}) => {
  const frame = useCurrentFrame();

  const walkSwing = walking ? Math.sin(frame * 0.4) * 8 : 0;
  const armSwing = walking ? Math.sin(frame * 0.4 + Math.PI) * 12 : 0;
  const danceBob = dancing ? Math.sin(frame * 0.5) * 6 : 0;
  const danceArm = dancing ? Math.sin(frame * 0.4) * 16 : 0;
  const waveArm = waving ? Math.sin(frame * 0.6) * 12 : 0;

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "bottom center",
      }}
      className="relative flex flex-col items-center select-none"
    >
      {/* Nameplate */}
      {name && (
        <div className="mb-2 bg-black/80 border-2 border-[#ffd199] px-2.5 py-0.5 rounded text-[11px] font-bold text-white shadow-md font-pixel whitespace-nowrap">
          {name}
        </div>
      )}

      {/* Shadow */}
      <div
        className="absolute bottom-0 w-16 h-6 bg-black/30 rounded-full"
        style={{ filter: "blur(2px)" }}
      />

      <div
        style={{
          transform: `translateY(${danceBob}px)`,
        }}
        className="relative flex flex-col items-center"
      >
        {/* Head */}
        <div className="relative z-20 flex flex-col items-center">
          {/* Hair */}
          <div className="w-16 h-8 bg-[#5b3a1a] rounded-t-xl border-2 border-black flex items-center justify-center relative">
            {/* Bangs */}
            <div className="absolute -bottom-2 w-14 h-3 bg-[#5b3a1a] border-b-2 border-black rounded-b-md" />
            <div className="absolute top-1 left-2 w-3 h-1 bg-[#805026] rounded-full" />
          </div>

          {/* Face */}
          <div className="w-14 h-12 bg-[#ffd199] border-2 border-black rounded-b-xl flex flex-col items-center justify-center relative -mt-1 shadow-inner">
            {/* Eyes */}
            <div className="flex gap-4 mb-1">
              <div className="w-2.5 h-2.5 bg-black rounded-sm" />
              <div className="w-2.5 h-2.5 bg-black rounded-sm" />
            </div>
            {/* Smile */}
            <div className="w-4 h-1.5 border-b-2 border-black rounded-b-full" />
          </div>
        </div>

        {/* Torso / Clothes */}
        <div className="relative z-10 flex items-center justify-center -mt-1">
          {/* Left Arm */}
          <div
            style={{
              transform: `rotate(${dancing ? -danceArm : armSwing}deg)`,
              transformOrigin: "top center",
            }}
            className="w-4 h-12 bg-[#ffd199] border-2 border-black rounded-full -mr-1"
          />

          {/* Shirt Body */}
          <div
            style={{ backgroundColor: shirtColor }}
            className="w-12 h-14 border-2 border-black rounded-lg flex flex-col items-center relative shadow-sm"
          >
            {/* Collar */}
            <div className="w-6 h-3 bg-white border-b-2 border-black rounded-b-md flex justify-center">
              {/* Tie */}
              <div className="w-2 h-6 bg-amber-400 border-x border-b border-black rounded-b-sm" />
            </div>
          </div>

          {/* Right Arm (Waving or swinging) */}
          <div
            style={{
              transform: waving
                ? `rotate(${140 + waveArm}deg)`
                : `rotate(${dancing ? danceArm : -armSwing}deg)`,
              transformOrigin: "top center",
            }}
            className="w-4 h-12 bg-[#ffd199] border-2 border-black rounded-full -ml-1"
          />
        </div>

        {/* Legs & Shoes */}
        <div className="flex gap-1 z-0 -mt-1">
          <div
            style={{
              transform: `translateY(${walkSwing}px)`,
            }}
            className="w-5 h-8 bg-[#1e293b] border-2 border-black rounded-b-sm relative flex flex-col justify-end"
          >
            {/* Shoe */}
            <div className="w-6 h-3 bg-[#0f172a] border-t-2 border-black -ml-0.5 rounded-b" />
          </div>

          <div
            style={{
              transform: `translateY(${-walkSwing}px)`,
            }}
            className="w-5 h-8 bg-[#1e293b] border-2 border-black rounded-b-sm relative flex flex-col justify-end"
          >
            {/* Shoe */}
            <div className="w-6 h-3 bg-[#0f172a] border-t-2 border-black -ml-0.5 rounded-b" />
          </div>
        </div>
      </div>
    </div>
  );
};
