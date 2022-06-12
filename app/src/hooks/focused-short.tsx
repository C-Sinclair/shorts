import { Short } from "@prisma/client";
import { atom, useAtom } from "jotai";
import { useMemo } from "react";
import { useAllShorts } from "./all-shorts";

const focusedShortIdAtom = atom<Short["id"] | null>(null);

export function useFocusedShort() {
  const { shorts } = useAllShorts();
  const [focusedShortId, setFocusedShortId] = useAtom(focusedShortIdAtom);

  const focusedShort = useMemo(
    () => shorts?.find((short) => short.id === focusedShortId),
    [shorts, focusedShortId],
  );

  return {
    focusedShort,
    setFocusedShortId,
  };
}
