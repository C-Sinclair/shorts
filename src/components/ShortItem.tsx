import clsx from "clsx";
import { KeyboardEvent, MouseEvent, useRef } from "react";
import { useFocusedShort } from "~/hooks/focused-short";

interface ShortItemProps {
  id: string;
  title: string;
  description: string;
  playbackId: string;
  path: string;
}

/**
 * Single short card to display
 */
export function ShortItem({
  id,
  title,
  description,
  playbackId,
  path,
}: ShortItemProps) {
  const { focusedShort, setFocusedShortId } = useFocusedShort();
  const isFocused = focusedShort?.id === id;

  /**
   * Selects the short to be focused
   */
  const select = () => {
    setFocusedShortId(id);
    history.pushState(null, "", `/v/${path}`);
  };

  /**
   * Dismisses the focused short
   */
  const dismiss = () => {
    setFocusedShortId(null);
    history.pushState(null, "", `/`);
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

  const onClickOutside = (e: MouseEvent) => {
    e.preventDefault();
    dismiss();
  };

  return (
    <article
      className={clsx(
        "group w-80 h-80 rounded-2xl transition-transform cursor-pointer hover:scale-110 relative text-white flex justify-end flex-col mr-16 overflow-hidden",
        {
          "fixed top-0 left-0 overflow-hidden": isFocused,
        },
      )}
      title={description}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-current={isFocused}
    >
      <img
        src={`https://image.mux.com/${playbackId}/thumbnail.png?width=400`}
        alt="thumbnail"
        className="absolute top-0 right-0 w-full h-full object-right-bottom object-cover -z-10"
      />
      <img
        src={`https://image.mux.com/${playbackId}/animated.gif?width=400`}
        alt="gif"
        loading="lazy"
        className="absolute top-0 right-0 w-full h-full object-right-bottom object-cover -z-5 opacity-0 group-hover:opacity-100"
      />
      <h1 className="font-code group-hover:text-yellow-500 font-bold text-2xl absolute top-4 left-4">
        {title}
      </h1>
    </article>
  );
}
