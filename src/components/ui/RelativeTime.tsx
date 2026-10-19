"use client";

import { formatAbsoluteDate, formatRelativeTime } from "@/lib/utils";
import { useEffect, useState } from "react";

export function RelativeTime({ isoDate }: { isoDate: string }) {
  const [label, setLabel] = useState(() => formatAbsoluteDate(isoDate));

  useEffect(() => {
    setLabel(formatRelativeTime(isoDate));
  }, [isoDate]);

  return <time dateTime={isoDate}>{label}</time>;
}
