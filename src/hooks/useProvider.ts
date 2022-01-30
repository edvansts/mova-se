import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import FirebaseClient from '../firebase/ClientApp';
import { User } from '../models/User';
import useUserContext from './useUserContext';

const useProvider = () => {
    const { createUser } = useUserContext();

    async function githubSignIn() {
        try {
            const provider = new GithubAuthProvider();
            const auth = getAuth(FirebaseClient.getInstance());

            const result = await signInWithPopup(auth, provider);

            const newUser = new User({
                email: result.user.email,
                name: result.user.displayName,
                photoUrl: result.user.photoURL,
                uid: result.user.uid,
                nickname: result.user['reloadUserInfo']?.screenName,
            });

            const token = await result.user.getIdToken();

            const user = await createUser(
                {
                    user: newUser,
                },
                token,
            );

            return user;
        } catch (err) {
            throw new Error(err);
        }
    }

    return { githubSignIn };
};

export default useProvider;
