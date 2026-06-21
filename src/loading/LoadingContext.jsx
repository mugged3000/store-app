"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

const LoadingCtx = createContext(null);

export function LoadingProvider({ children }) {
  const [pendingCount, setPendingCount] = useState(0);
  const registered = useRef(new Set());

  const register = useCallback((id) => {
    if (registered.current.has(id)) return;
    registered.current.add(id);
    setPendingCount((n) => n + 1);
  }, []);

  const complete = useCallback((id) => {
    if (!registered.current.has(id)) return;
    registered.current.delete(id);
    setPendingCount((n) => Math.max(0, n - 1));
  }, []);

  return (
    <LoadingCtx.Provider value={{ pendingCount, register, complete }}>
      {children}
    </LoadingCtx.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(LoadingCtx);
  if (!ctx) throw new Error("useLoading must be used inside <LoadingProvider>");
  return ctx;
}

export function useLoadingTask(id) {
  const { register, complete } = useLoading();
  const calledRef = useRef(false);

  if (!calledRef.current) {
    calledRef.current = true;
    register(id);
  }

  const done = useCallback(() => complete(id), [complete, id]);
  return { done };
}