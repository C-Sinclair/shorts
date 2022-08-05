import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";

const tmuxLogo = staticFile("tmux-logo.png");
const megaphone = staticFile("megaphone.png");

export function TmuxSessionCommsIntro() {
  const frame = useCurrentFrame();

  const tmuxOpacity = interpolate(frame, [0, 15, 140, 150], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sessionOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const commsLeft = interpolate(frame, [20, 120], [-1200, 1200]);
  const comms2Left = interpolate(frame, [105, 130], [-1000, 1000], {
    extrapolateLeft: "extend",
    extrapolateRight: "extend",
  });
  const rotateMega = interpolate(frame, [100, 105], [15, -15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <main id="tmux-session-comms">
      <Img src={tmuxLogo} className="tmux" style={{ opacity: tmuxOpacity }} />
      <h1 className="session" style={{ opacity: sessionOpacity }}>
        session
      </h1>
      <h1 className="communication" style={{ left: commsLeft }}>
        communication
      </h1>
      <Img
        src={megaphone}
        className="megaphone"
        style={{ transform: `rotate(${rotateMega}deg)` }}
      />
      <h1
        className="communication2"
        style={{
          transform: `rotate(-28deg) translate(${comms2Left}px, ${(-1 * comms2Left) / 14
            }px)`,
        }}
      >
        communication
      </h1>
    </main>
  );
}
