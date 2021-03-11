import '../styles/global.css';
import firebase from 'firebase';

import 'firebase/auth';
import 'firebase/database';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
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
        firebase.analytics();
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp;
