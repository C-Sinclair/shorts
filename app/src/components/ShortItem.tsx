import clsx from "clsx";
import { useRouter } from "next/router";
import { KeyboardEvent, MouseEvent } from "react";
import { useFocusedShort } from "~/hooks/focused-short";

interface ShortItemProps {
  id: string;
  title: string;
  description: string;
  playbackId: string;
  path: string;
  thumbnailTime?: number;
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
  thumbnailTime,
}: ShortItemProps) {
  const router = useRouter();

  const { focusedShort, setFocusedShortId } = useFocusedShort();
  const isFocused = focusedShort?.id === id;

  /**
   * Selects the short to be focused
   */
  const select = () => {
    setFocusedShortId(id);
    router.push(`/v/${path}`);
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
        src={`https://image.mux.com/${playbackId}/thumbnail.png?width=400&height=400&fit_mode=pad${
          thumbnailTime ? `&time=${thumbnailTime}` : ""
        }`}
        alt="thumbnail"
        className="absolute top-0 right-0 w-full h-full object-right-bottom object-cover -z-10"
      />
      <img
        src={`https://image.mux.com/${playbackId}/animated.gif?width=400`}
        alt="gif"
        loading="lazy"
        className="absolute top-0 right-0 w-full h-full object-right-bottom object-cover -z-5 opacity-0 group-hover:opacity-100"
      />
      <h1 className="font-code opacity-0 group-hover:opacity-100 text-yellow-500 font-bold text-2xl absolute top-4 left-4">
        {title}
      </h1>
    </article>
  );
}
