import * as firebase from 'firebase/app';
import 'firebase/auth';
import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_CLIENT_NAME,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
} from '../static/constants';

const clientInstanceName = FIREBASE_CLIENT_NAME;

const clientCredentials = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
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
