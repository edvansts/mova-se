import { VercelRequest, VercelResponse } from '@vercel/node';
import firebase from 'firebase/app';

export async function connectToDatabase() {
  await import('firebase/database');

    if (firebase.apps.length === 0) {
        const firebaseConfig = {
            apiKey: 'AIzaSyDXBD7tP3HTclCE-k_sKgRMwQdRQNxZlZk',
            authDomain: 'mova-se-dc2d1.firebaseapp.com',
            projectId: 'mova-se-dc2d1',
            storageBucket: 'mova-se-dc2d1.appspot.com',
            messagingSenderId: '867261760647',
            appId: '1:867261760647:web:3fdaf66b3587b2ccbea422',
            measurementId: 'G-VV7GDNQE88',
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

    const database = firebase.database();

    return database;
}

export default async (req: VercelRequest, res: VercelResponse) => {
    const database = await connectToDatabase();

    // return res.status(200).json(response.val());

    const refData = database.ref().child(`users`);

    return new Promise<void>((resolve, reject) => {
        refData
            .get()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                // res.setHeader('Cache-Control', 'max-age=180000');
                res.end(JSON.stringify(response));
                return resolve();
                // return res.status(200).json(response.val());
            })
            .catch(error => {
                res.json(error);
                res.status(405).end();
                return resolve();
            });
    });
};
