"use client";

import { makeStore } from "@/store";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [bundle, setBundle] = useState<ReturnType<typeof makeStore> | null>(
    null,
  );

  useEffect(() => {
    setBundle(makeStore());
  }, []);

  if (!bundle) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-sm text-[var(--muted)]">
        Loading dashboard…
      </div>
    );
  }

  return (
    <Provider store={bundle.store}>
      <PersistGate loading={null} persistor={bundle.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
