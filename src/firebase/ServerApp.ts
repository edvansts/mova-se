import admin from 'firebase-admin';

import {
    FIREBASE_DATABASE_URL,
    FIREBASE_SERVER_NAME,
    FIREBASE_SERVICE_ACCOUNT_KEY,
} from '../static/constants';

const serverInstanceName = FIREBASE_SERVER_NAME;

const FIREBASE_SERVICE_ACCOUNT_KEY_JSON = JSON.parse(
    FIREBASE_SERVICE_ACCOUNT_KEY,
);

const serverCredentials = {
    credential: admin.credential.cert(
        FIREBASE_SERVICE_ACCOUNT_KEY_JSON as admin.ServiceAccount,
    ),
    databaseURL: FIREBASE_DATABASE_URL,
};

class FirebaseServer {
    static _firestore: FirebaseFirestore.Firestore;
    static _auth: admin.auth.Auth;

    static getDbInstance(): FirebaseFirestore.Firestore {
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

    static getAuthInstance(): admin.auth.Auth {
        try {
            if (this._auth) {
                return this._auth;
            }

            this._auth = admin.app(serverInstanceName).auth();

            return this._auth;
        } catch (err) {
            this._auth = admin
                .initializeApp(serverCredentials, serverInstanceName)
                .auth();

            return this._auth;
        }
    }
}

export default FirebaseServer;
