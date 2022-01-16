import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import FirebaseClient from '../firebase/ClientApp';
import Firebase from '../firebase/ClientApp';

const useGihubLogin = () => {
    async function signIn() {
        const provider = new GithubAuthProvider();
        const auth = getAuth(FirebaseClient.getInstance());

        const result = await signInWithPopup(auth, provider);

        return result;
    }

    return { signIn };
};

export default useGihubLogin;
