"use client";

import { makeStore } from "@/store";
import { useSyncExternalStore } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const emptySubscribe = () => () => {};

let clientBundle: ReturnType<typeof makeStore> | null = null;

function getClientBundle() {
  if (typeof window === "undefined") return null;
  if (!clientBundle) {
    clientBundle = makeStore();
  }
  return clientBundle;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const bundle = useSyncExternalStore(
    emptySubscribe,
    getClientBundle,
    () => null,
  );

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
