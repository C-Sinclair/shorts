import { useNavigate } from "@solidjs/router";
import clsx from "clsx";
import { focusedShortSignal, Short } from "~/hooks/shorts";

type ShortItemProps = {
  short: Short;
};

/**
 * Single short card to display
 */
export function ShortItem(props: ShortItemProps) {
  const [focusedShort, setFocusedShort] = focusedShortSignal;
  const isFocused = focusedShort()?.id === props.short.id;

  const navigate = useNavigate();

  /**
   * Selects the short to be focused
   */
  const select = () => {
    setFocusedShort(props.short);
    navigate(`/v/${props.short.path}`);
  };

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    select();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      select();
    }
  };

  return (
    <article
      class={clsx(
        "group w-80 h-80 rounded-2xl transition-transform cursor-pointer hover:scale-110 relative text-white flex justify-end flex-col mr-16 overflow-hidden",
        {
          "fixed top-0 left-0 overflow-hidden": isFocused,
        },
      )}
      title={props.short.description}
      onClick={onClick}
      onKeyDown={onKeyDown}
      // onMouseOver={onHover}
      aria-current={isFocused}
    >
      <img
        src={`https://image.mux.com/${props.short.playbackId}/thumbnail.png?width=400&height=400&fit_mode=pad${
          props.short.thumbnailTime ? `&time=${props.short.thumbnailTime}` : ""
        }`}
        alt="thumbnail"
        class="absolute top-0 right-0 w-full h-full object-right-bottom object-cover -z-10"
      />
      <img
        src={`https://image.mux.com/${props.short.playbackId}/animated.gif?width=400`}
        alt="gif"
        loading="lazy"
        class="absolute top-0 right-0 w-full h-full object-right-bottom object-cover -z-5 opacity-0 group-hover:opacity-100"
      />
      <h1 class="font-code opacity-0 group-hover:opacity-100 text-yellow-500 font-bold text-2xl absolute top-4 left-4">
        {props.short.title}
      </h1>
    </article>
  );
}
