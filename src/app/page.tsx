import { DashboardShell } from "@/components/layout/DashboardShell";
import { Suspense } from "react";

function DashboardFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-sm text-[var(--muted)]">
      Loading dashboard…
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <DashboardShell />
    </Suspense>
  );
}
