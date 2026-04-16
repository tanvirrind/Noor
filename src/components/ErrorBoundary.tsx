"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = this.state.error?.message || "Unknown error";
      let isFirestoreError = false;
      let firestoreInfo: any = null;

      try {
        if (errorMessage.startsWith('{') && errorMessage.endsWith('}')) {
          firestoreInfo = JSON.parse(errorMessage);
          if (firestoreInfo.operationType) {
            isFirestoreError = true;
          }
        }
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#fafaf9]">
          <div className="max-w-md w-full bg-white border rounded-[32px] p-8 text-center space-y-6 shadow-xl shadow-black/5">
            <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight">
                {isFirestoreError ? "Database Permission Denied" : "Something went wrong"}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {isFirestoreError 
                  ? "You don't have permission to perform this action. Please sign in or check your account status." 
                  : "We encountered an unexpected error. This might be due to a connection issue."}
              </p>
            </div>
            {isFirestoreError ? (
               <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-xl text-[10px] font-mono text-left space-y-2 text-muted-foreground">
                    <p><span className="font-bold uppercase">Operation:</span> {firestoreInfo.operationType}</p>
                    <p><span className="font-bold uppercase">Path:</span> {firestoreInfo.path}</p>
                    <p><span className="font-bold uppercase">User:</span> {firestoreInfo.authInfo.userId || "Not Signed In"}</p>
                  </div>
                  <button
                    onClick={() => window.location.href = '/'}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2"
                  >
                    Go Back Home
                  </button>
               </div>
            ) : (
               <>
                {this.state.error && (
                  <div className="p-4 bg-muted rounded-xl text-[10px] font-mono text-left overflow-auto max-h-32 text-muted-foreground">
                      {errorMessage}
                  </div>
                )}
                <button
                  onClick={() => window.location.reload()}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                  <RefreshCcw className="w-5 h-5" />
                  Reload Application
                </button>
               </>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
