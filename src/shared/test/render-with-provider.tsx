import type { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RenderHookOptions,
  RenderOptions,
  render,
  renderHook,
} from "@testing-library/react";
import { MemoryRouter } from "react-router";

import { AdaptersContext } from "../adapters/core/app";
import { IAdapters } from "../adapters/core/domain";
import { RepositoryContext } from "../repositories/app";
import { IRepositories } from "../repositories/domain";

// REPOSITORIES
export type MockRepositories = {
  [K in keyof IRepositories]?: Partial<IRepositories[K]>;
};

interface RepositoryProviderProps {
  children: ReactNode;
  mock?: MockRepositories;
}

export function MockRepositoryProvider({
  children,
  mock,
}: RepositoryProviderProps) {
  const value = mock as IRepositories;
  return (
    <RepositoryContext.Provider value={value}>
      {children}
    </RepositoryContext.Provider>
  );
}

// ADAPTERS
export type MockAdapters = {
  [K in keyof IAdapters]?: Partial<IAdapters[K]>;
};

interface AdapterProviderProps {
  children: ReactNode;
  mock?: MockAdapters;
}

export function MockAdaptersProvider({ children, mock }: AdapterProviderProps) {
  const value = mock as IAdapters;
  return (
    <AdaptersContext.Provider value={value}>
      {children}
    </AdaptersContext.Provider>
  );
}

// NON INVERTED DEPENDENCIES
// ✅ A fresh QueryClient per test avoids cache bleed between tests
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // don't retry by default in tests
      },
    },
  });

interface ProvidersProps {
  children: ReactNode;
  initialEntries?: string[]; // optional initial routes
}

export function TestProviders({
  children,
  initialEntries = ["/"],
}: ProvidersProps) {
  const queryClient = createTestQueryClient();

  return (
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  );
}

/**
 * Shared wrapper factory for consistent provider hierarchy
 */
function createWrapper({
  adapters,
  initialEntries,
  repositories,
}: {
  adapters?: MockAdapters;
  initialEntries?: string[];
  repositories?: MockRepositories;
}) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <TestProviders initialEntries={initialEntries}>
        <MockRepositoryProvider mock={repositories}>
          <MockAdaptersProvider mock={adapters}>
            {children}
          </MockAdaptersProvider>
        </MockRepositoryProvider>
      </TestProviders>
    );
  };
}

/**
 * Render a React component with all test providers.
 */
export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & {
    adapters?: MockAdapters;
    initialEntries?: string[];
    repositories?: MockRepositories;
  },
) {
  const { adapters, initialEntries, repositories, ...renderOptions } =
    options ?? {};

  return render(ui, {
    wrapper: createWrapper({ adapters, initialEntries, repositories }),
    ...renderOptions,
  });
}

/**
 * Render a React hook with all test providers.
 */
export function renderHookWithProviders<Result, Props>(
  callback: (props: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, "wrapper"> & {
    adapters?: MockAdapters;
    initialEntries?: string[];
    repositories?: MockRepositories;
  },
) {
  const { adapters, initialEntries, repositories, ...renderOptions } =
    options ?? {};

  return renderHook(callback, {
    wrapper: createWrapper({ adapters, initialEntries, repositories }),
    ...renderOptions,
  });
}
