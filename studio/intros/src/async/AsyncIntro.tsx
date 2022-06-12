import {
  Easing,
  Img,
  interpolate,
  interpolateColors,
  useCurrentFrame,
} from "remotion";
import "../styles.css";

export const AsyncIntro = () => {
  return (
    <main style={{ padding: 0, justifyContent: "center" }}>
      <div className="sequential">
        <h1>
          {["S", "e", "q", "u", "e", "n", "t", "i", "a", "l"].map(
            (letter, index) => (
              <SequentialLetter key={index} letter={letter} index={index} />
            ),
          )}
        </h1>
      </div>
      <AsyncTitle />
      <div className="operations">
        <h1>
          {[
            ["O", "☕"],
            ["p", "🙈"],
            ["e", "👅"],
            ["r", "💯"],
            ["a", "🌍"],
            ["t", "🐘"],
            ["i", "🍒"],
            ["o", "👾"],
            ["n", "🔥"],
            ["s", "🛀"],
          ].map((combo, index) => (
            <OperationLetter
              key={index}
              combo={combo as [string, string]}
              index={index}
            />
          ))}
        </h1>
      </div>
    </main>
  );
};

const AsyncTitle = () => {
  const frame = useCurrentFrame();
  const color = interpolateColors(
    frame,
    [95, 110, 115, 120, 125, 130, 135, 140, 145],
    [
      "white",
      "white",
      "red",
      "blue",
      "green",
      "orange",
      "magenta",
      "pink",
      "purple",
    ],
  );
  return (
    <div className="async">
      {frame < 40 ? null : frame < 97
        ? (
          <Img
            src="http://samherbert.net/svg-loaders/svg-loaders/oval.svg"
            height={150}
          />
        )
        : <h1 style={{ color }}>async</h1>}
    </div>
  );
};

const SEQ_LETTER_FRAME_START = 15;
const SEQ_LETTER_FRAME_END = 140;

const SequentialLetter = (
  { letter, index }: { letter: string; index: number },
) => {
  const start = SEQ_LETTER_FRAME_START + index * 4;
  const end = SEQ_LETTER_FRAME_END - index * 4;

  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [start, start + 1, end - 1, end],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
    },
  );
  return <span style={{ opacity }}>{letter}</span>;
};

const OP_LETTER_FRAME_START = 50;
const OP_LETTER_FRAME_END = 130;

const OperationLetter = ({
  combo,
  index,
}: {
  combo: [string, string];
  index: number;
}) => {
  const start = OP_LETTER_FRAME_START + index * 2;
  const end = OP_LETTER_FRAME_END - index * 2;

  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [OP_LETTER_FRAME_START, OP_LETTER_FRAME_START + 1, end - 1, end],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
    },
  );
  // 2 frames of the emoji
  const isEmoji = frame < start + 4;
  const letter = isEmoji ? combo[1] : combo[0];
  return (
    <span
      style={{
        opacity,
        fontSize: isEmoji ? "0.7em" : "0.8em",
        padding: isEmoji ? 0 : `0 26px`,
      }}
    >
      {letter}
    </span>
  );
};
