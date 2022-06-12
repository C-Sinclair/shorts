import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import "../styles.css";

const gopherEyesOpen = staticFile("gopher-eyes-open.svg");
const gopherEyesClosed = staticFile("gopher-eyes-closed.svg");
const gopherLeftEyeClosed = staticFile("gopher-left-eye-closed.svg");
const gopherRightEyeClosed = staticFile("gopher-right-eye-closed.svg");

export const GoStaticIntro = () => {
  const frame = useCurrentFrame();
  const staticOpacity = interpolate(frame, [2, 6, 125, 130], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const assetOpacity = interpolate(frame, [6, 9, 123, 127], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const serverOpacity = interpolate(frame, [9, 12, 120, 125], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <main id="go-static">
      <h1
        className="static"
        style={{ color: "#e94235", opacity: staticOpacity }}
      >
        Static
      </h1>
      <h1 className="asset" style={{ color: "#F7D3A2", opacity: assetOpacity }}>
        Asset
      </h1>
      <h1
        className="server"
        style={{ color: "#74CEDD", opacity: serverOpacity }}
      >
        Server
      </h1>
      <Gopher />
    </main>
  );
};

const Gopher = () => {
  const frame = useCurrentFrame();

  const bottom = interpolate(
    frame,
    [0, 10, 25, 28, 60, 70, 135, 150],
    [-550, -399, -400, -420, -374, -280, -300, -550],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const rotate = interpolate(frame, [40, 50], [0, 0], {
    extrapolateLeft: "clamp",
  });

  const tick = interpolate(
    frame,
    [0, 25, 30, 50, 55, 80, 88, 96, 100, 120, 125, 140, 145],
    [0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 3, 0],
    {
      easing: Easing.step1,
    },
  );
  const gopher = tick < 1
    ? gopherEyesOpen
    : tick < 2
      ? gopherEyesClosed
      : tick < 3
        ? gopherLeftEyeClosed
        : gopherRightEyeClosed;
  return (
    <Img
      src={gopher}
      style={{
        position: "absolute",
        bottom: `${bottom}px`,
        transform: `rotate(${rotate}deg)`,
      }}
    />
  );
};
