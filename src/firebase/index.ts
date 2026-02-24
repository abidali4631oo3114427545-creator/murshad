
'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

export function initializeFirebase(): { app: FirebaseApp; firestore: Firestore; auth: Auth } | null {
  try {
    // Basic validation to prevent crashing during setup if environment variables are missing
    if (!firebaseConfig.apiKey) {
      console.warn('Firebase configuration is incomplete. Authentication and Firestore will be unavailable.');
      return null;
    }

    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    return { app, firestore, auth };
  } catch (error) {
    console.error('Firebase failed to initialize:', error);
    return null;
  }
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-doc';
export * from './firestore/use-collection';
export * from './auth/use-user';
