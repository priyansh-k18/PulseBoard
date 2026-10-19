"use client";

import { formatAbsoluteDate, formatRelativeTime } from "@/lib/utils";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function RelativeTime({ isoDate }: { isoDate: string }) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const label = isMounted
    ? formatRelativeTime(isoDate)
    : formatAbsoluteDate(isoDate);

  return <time dateTime={isoDate}>{label}</time>;
}
