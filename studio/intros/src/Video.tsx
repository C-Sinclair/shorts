import { Composition } from "remotion";
import { RipIntro } from "./rip/RipIntro";
import { AsyncIntro } from "./async/AsyncIntro";
import { GoStaticIntro } from "./golang-static/GoStaticIntro";

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
      <Composition
        id="async-intro"
        component={AsyncIntro}
        // 5 seconds in length
        durationInFrames={5 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="go-static-intro"
        component={GoStaticIntro}
        // 5 seconds in length
        durationInFrames={5 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
