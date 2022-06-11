import { Composition } from "remotion";
import { RipIntro } from "./rip/RipIntro";

const FPS = 30;

export const VideoRoot = () => {
  return (
    <>
      <Composition
        id="rip-intro"
        component={RipIntro}
        // 5 seconds in length
        durationInFrames={5 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
