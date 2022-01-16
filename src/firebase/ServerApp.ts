import admin from 'firebase-admin';

import adminKeys from '../../adminKeys.json';

const serverInstanceName = process.env.NEXT_PUBLIC_FIREBASE_SERVER_NAME;

const serverCredentials = {
    credential: admin.credential.cert(adminKeys as admin.ServiceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

class FirebaseServer {
    static _firestore: FirebaseFirestore.Firestore;
    static getInstance(): admin.firestore.Firestore {
        try {
            if (this._firestore) {
                return this._firestore;
            }

            this._firestore = admin.app(serverInstanceName).firestore();

            return this._firestore;
        } catch (err) {
            this._firestore = admin
                .initializeApp(serverCredentials, serverInstanceName)
                .firestore();

            return this._firestore;
        }
    }
}

export default FirebaseServer;
