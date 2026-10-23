import React from "react";
import {
  Sequence,
  Audio,
  staticFile,
} from "remotion";
import { Scene1_Intro } from "./scenes/Scene1_Intro";
import { Scene2_FiveZones } from "./scenes/Scene2_FiveZones";
import { Scene3_RealisticCases } from "./scenes/Scene3_RealisticCases";
import { Scene4_DetectiveChallenge } from "./scenes/Scene4_DetectiveChallenge";
import { Scene5_FeaturesAndMobile } from "./scenes/Scene5_FeaturesAndMobile";
import { Scene6_Outro } from "./scenes/Scene6_Outro";

export const HabboPromoVideo: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-black font-sans">
      {/* 1. Background Music: Upbeat 8-Bit Chiptune Track (Looped throughout) */}
      <Audio
        src={staticFile("audio/bgm_chiptune.wav")}
        volume={0.32}
      />

      {/* 2. Synchronized Voiceover Tracks (Native Indonesian Accents) */}
      {/* Scene 1 VO */}
      <Sequence from={15} durationInFrames={195}>
        <Audio src={staticFile("audio/vo_scene1.mp3")} volume={1.0} />
      </Sequence>

      {/* Scene 2 VO */}
      <Sequence from={220} durationInFrames={230}>
        <Audio src={staticFile("audio/vo_scene2.mp3")} volume={1.0} />
      </Sequence>

      {/* Scene 3 VO */}
      <Sequence from={460} durationInFrames={290}>
        <Audio src={staticFile("audio/vo_scene3.mp3")} volume={1.0} />
      </Sequence>

      {/* Scene 4 VO */}
      <Sequence from={760} durationInFrames={260}>
        <Audio src={staticFile("audio/vo_scene4.mp3")} volume={1.0} />
      </Sequence>

      {/* Scene 5 VO */}
      <Sequence from={1030} durationInFrames={170}>
        <Audio src={staticFile("audio/vo_scene5.mp3")} volume={1.0} />
      </Sequence>

      {/* Scene 6 VO */}
      <Sequence from={1210} durationInFrames={140}>
        <Audio src={staticFile("audio/vo_scene6.mp3")} volume={1.0} />
      </Sequence>

      {/* 3. Visual Scenes */}
      {/* Scene 1: Hook & Hero Intro (0s - 7s) */}
      <Sequence from={0} durationInFrames={210}>
        <Scene1_Intro />
      </Sequence>

      {/* Scene 2: 5 Isometric Zones Showcase (7s - 15s) */}
      <Sequence from={210} durationInFrames={240}>
        <Scene2_FiveZones />
      </Sequence>

      {/* Scene 3: 20 Real Cases & Realistic Animations (15s - 25s) */}
      <Sequence from={450} durationInFrames={300}>
        <Scene3_RealisticCases />
      </Sequence>

      {/* Scene 4: Interactive Detective Challenge (25s - 34s) */}
      <Sequence from={750} durationInFrames={270}>
        <Scene4_DetectiveChallenge />
      </Sequence>

      {/* Scene 5: Complete Features, Tutorial & Mobile Ready (34s - 40s) */}
      <Sequence from={1020} durationInFrames={180}>
        <Scene5_FeaturesAndMobile />
      </Sequence>

      {/* Scene 6: Outro, Grand Celebration & Credits (40s - 45s) */}
      <Sequence from={1200} durationInFrames={150}>
        <Scene6_Outro />
      </Sequence>
    </div>
  );
};
