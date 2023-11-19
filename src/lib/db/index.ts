import admin, { type FirebaseError, type ServiceAccount } from 'firebase-admin';

import { DB_COLLECTION_NAME } from '@/constants/db';

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string,
);

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
  } catch (error) {
    console.log(
      'Firebase admin initialization error',
      (error as FirebaseError).stack ? (error as FirebaseError).stack : '',
    );
  }
}

export const db = admin.firestore();

export const viewRef = db.collection(DB_COLLECTION_NAME);

export default db;
