'use client';

import React, { useEffect, useState } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const [instances, setInstances] = useState<{
    app: FirebaseApp;
    firestore: Firestore;
    auth: Auth;
  } | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const initializedInstances = initializeFirebase();
    if (initializedInstances) {
      setInstances(initializedInstances);
    }
    setHasInitialized(true);
  }, []);

  // Allow the app to proceed even if Firebase fails (it will use simulated data)
  if (!hasInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-medium text-muted-foreground animate-pulse">Initializing Insight Stream...</p>
        </div>
      </div>
    );
  }

  // If instances are null (e.g. invalid config), we provide a mock context or handle it in hooks
  return (
    <FirebaseProvider
      app={instances?.app as FirebaseApp}
      firestore={instances?.firestore as Firestore}
      auth={instances?.auth as Auth}
    >
      {children}
    </FirebaseProvider>
  );
}
