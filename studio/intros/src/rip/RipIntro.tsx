import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import "../styles.css";

export const RipIntro = () => {
  const frame = useCurrentFrame();

  const rOpacity = interpolate(frame, [15, 16, 105, 110], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
  });
  const iOpacity = interpolate(frame, [20, 21, 109, 113], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
  });
  const pOpacity = interpolate(frame, [27, 28, 112, 115], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
  });

  return (
    <main>
      <Coffin />
      <div className="title">
        <h1>
          <span style={{ opacity: rOpacity }}>R</span>
          <span style={{ opacity: iOpacity }}>I</span>
          <span style={{ opacity: pOpacity }}>P</span>
        </h1>
      </div>
      <Prompt />
    </main>
  );
};

const Coffin = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30, 95, 105], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [95, 105], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rotate = interpolate(frame, [95, 105], [0, 720], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <Img
      src={staticFile("coffin-icon.webp")}
      style={{
        width: 400,
        objectFit: "contain",
        opacity,
        transform: `scale(${scale}) rotate(${rotate}deg)`,
      }}
    />
  );
};

const Prompt = () => {
  const frame = useCurrentFrame();
  const promptLeft = interpolate(
    frame,
    [0, 18, 22, 29, 120],
    [41, 48, 55, 63, 120],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "identity",
      easing: Easing.step1,
    },
  );
  return (
    <p
      id="prompt"
      style={{
        left: `${promptLeft}vw`,
      }}
      className={frame < 115 ? "blink" : ""}
    >
      _
    </p>
  );
};
