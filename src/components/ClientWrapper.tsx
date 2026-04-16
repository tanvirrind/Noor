"use client";

import ErrorBoundary from "./ErrorBoundary";
import FirebaseProvider from "./FirebaseProvider";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <FirebaseProvider>
        {children}
      </FirebaseProvider>
    </ErrorBoundary>
  );
}
