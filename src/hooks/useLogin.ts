import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import FirebaseClient from '../firebase/ClientApp';

const useLogin = () => {
    async function githubSignIn() {
        const provider = new GithubAuthProvider();
        const auth = getAuth(FirebaseClient.getInstance());

        const result = await signInWithPopup(auth, provider);

        // console.log(result);

        return result;
    }

    return { githubSignIn };
};

export default useLogin;
