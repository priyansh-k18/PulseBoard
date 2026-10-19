import { makeStore } from "@/store";
import { cleanup, render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

export function renderWithProviders(ui: ReactElement) {
  const { store } = makeStore();

  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper }),
  };
}
