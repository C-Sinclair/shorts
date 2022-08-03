import { Composition } from "remotion";
import { RipIntro } from "./RipIntro";
import { AsyncIntro } from "./AsyncIntro";
import { GoStaticIntro } from "./GoStaticIntro";
import { JotaiAsyncIntro } from "./JotaiAsyncIntro";
import { TypedCssVarsIntro } from "./TypedCssVarsIntro";
import { TmuxSessionCommsIntro } from "./TmuxSessionCommsIntro";

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
      <Composition
        id="jotai-async-intro"
        component={JotaiAsyncIntro}
        // 5 seconds in length
        durationInFrames={5 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="typed-css-vars-intro"
        component={TypedCssVarsIntro}
        // 5 seconds in length
        durationInFrames={5 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="tmux-session-communication"
        component={TmuxSessionCommsIntro}
        // 5 seconds in length
        durationInFrames={5 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
