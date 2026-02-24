'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

export function initializeFirebase(): { app: FirebaseApp; firestore: Firestore; auth: Auth } | null {
  try {
    // Check for required configuration to prevent runtime crashes with invalid/missing keys
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'undefined') {
      console.warn('Firebase API key is missing. The dashboard will use simulated data.');
      return null;
    }

    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    return { app, firestore, auth };
  } catch (error) {
    console.error('Firebase failed to initialize safely:', error);
    return null;
  }
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-doc';
export * from './firestore/use-collection';
export * from './auth/use-user';
