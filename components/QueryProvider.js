"use client";

import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : null,
  key: "tiedUpcache",
});

export const QueryProvider = ({ children }) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
      <ToastContainer />
    </PersistQueryClientProvider>
  );
};
