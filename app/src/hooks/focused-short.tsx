import { Short } from "@prisma/client";
import { atom, useAtom } from "jotai";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo } from "react";
import { useAllShorts } from "./all-shorts";

const focusedShortIdAtom = atom<Short["id"] | null>(null);

export function useFocusedShort() {
  const router = useRouter();

  const { shorts } = useAllShorts();
  const [focusedShortId, setFocusedShortId] = useAtom(focusedShortIdAtom);

  const focusedShort = useMemo(
    () => shorts?.find((short) => short.id === focusedShortId),
    [shorts, focusedShortId],
  );

  const resetFocused = useCallback(() => {
    setFocusedShortId(null);
  }, [setFocusedShortId]);

  useEffect(
    function subscribeResetToRouteChange() {
      router.events.on("routeChangeComplete", resetFocused);
      return () => {
        router.events.off("routeChangeComplete", resetFocused);
      };
    },
    [router, resetFocused],
  );

  return {
    focusedShort,
    setFocusedShortId,
  };
}
