import { config } from 'dotenv';

import { cert, initializeApp } from 'firebase-admin/app';
import { type DecodedIdToken, getAuth } from 'firebase-admin/auth';

config();

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // convert escaped newline characters '\\n' back to '\n'
  }),
});

const auth = getAuth(app);

export { auth, type DecodedIdToken as TUser };
