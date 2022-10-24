import type { FirebaseError, ServiceAccount } from 'firebase-admin';
import admin from 'firebase-admin';

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
  } catch (error) {
    console.log(
      'Firebase admin initialization error',
      (error as FirebaseError).stack ? (error as FirebaseError).stack : ''
    );
  }
}

export default admin.firestore();
