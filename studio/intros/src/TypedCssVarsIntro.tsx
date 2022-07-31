import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import "./styles.css";

const cssLogo = staticFile("css-logo.png");
const reactLogo = staticFile("react-logo.png");

export function TypedCssVarsIntro() {
  const frame = useCurrentFrame();

  const typedOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cssOpacity = interpolate(frame, [40, 45, 100, 121], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const varsOpacity = interpolate(frame, [10, 11, 120, 131], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const reactOpacity = interpolate(frame, [60, 70, 140, 145], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <main id="typed-css-vars">
      <h1 className="typed" style={{ opacity: typedOpacity }}>
        Typed
      </h1>
      <Img src={cssLogo} className="css" style={{ opacity: cssOpacity }} />
      <h1 className="variables" style={{ opacity: varsOpacity }}>
        Variables
      </h1>
      <Img
        src={reactLogo}
        className="react"
        style={{ opacity: reactOpacity }}
      />
    </main>
  );
}
