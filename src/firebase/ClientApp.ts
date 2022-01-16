import * as firebase from 'firebase/app';
import 'firebase/auth';

const clientInstanceName = process.env.NEXT_PUBLIC_FIREBASE_CLIENT_NAME;

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

class FirebaseClient {
    static _firebaseApp: firebase.FirebaseApp;

    static getInstance(): firebase.FirebaseApp {
        try {
            if (this._firebaseApp) {
                return this._firebaseApp;
            }

            this._firebaseApp = firebase.getApp(clientInstanceName);
            return this._firebaseApp;
        } catch (err) {
            this._firebaseApp = firebase.initializeApp(
                clientCredentials,
                clientInstanceName,
            );

            return this._firebaseApp;
        }
    }
}

export default FirebaseClient;
