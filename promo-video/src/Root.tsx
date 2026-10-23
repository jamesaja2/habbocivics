import "./index.css";
import React from "react";
import { Composition } from "remotion";
import { HabboPromoVideo } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HabboCivicsPromo"
        component={HabboPromoVideo}
        durationInFrames={1350} // 45 seconds
        fps={30}
        width={1920}
        height={1080} // 16:9 Aspect Ratio
      />
    </>
  );
};
