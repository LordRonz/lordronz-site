import { type FirebaseError } from 'firebase-admin';
import {
  cert,
  getApps,
  initializeApp,
  type ServiceAccount,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import { DB_COLLECTION_NAME } from '@/constants/db';

const serviceAccount = JSON.parse(
  (process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string) || '""',
);

if (!getApps().length) {
  try {
    initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
    });
  } catch (error) {
    console.log(
      'Firebase admin initialization error',
      (error as FirebaseError).stack ? (error as FirebaseError).stack : '',
    );
  }
}

export const db = () => getFirestore();

export const viewRef = () => db().collection(DB_COLLECTION_NAME);

export default db;
