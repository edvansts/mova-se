import { useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { FiGithub } from 'react-icons/fi';
import { User } from '../models/User';
import useGihubLogin from '../hooks/useGihubLogin';
import useUser from '../hooks/useUser';
import Button from './Button';

import styles from '../styles/components/LoginInput.module.css';

const LoginInput: React.FC = () => {
    const { t } = useTranslation('login');
    const router = useRouter();

    const { signIn } = useGihubLogin();

    const { createUser } = useUser();

    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loginError, setLoginError] = useState('');

    async function handleSignInGithub() {
        setLoadingLogin(true);

        try {
            const result = await signIn();

            if (result) {
                const newUser = new User(
                    result.user.uid,
                    result.user.email,
                    result.user.displayName,
                    result.user.photoURL,
                );

                await createUser(newUser);

                // router.push('/', undefined, { locale: router.locale });
            }
        } catch (err) {
            console.log(err);
            setLoginError(t('inputError.notFound'));
        } finally {
            setLoadingLogin(false);
        }
    }

    // function handleChangeUsername(event: ChangeEvent<HTMLInputElement>) {
    //     const newUsername = event.target.value;

    //     setUsername(newUsername);
    // }

    // function handleInputError(event: FormEvent<HTMLInputElement>) {
    //     const field = event.currentTarget;

    //     if (!field.value)
    //         return field.setCustomValidity(t('inputError.required'));

    //     // if (field.value.includes(' '))
    //     //     return field.setCustomValidity(t('inputError.notSpaces'));
    // }

    return (
        <div className={styles.signInContainer}>
            <Button
                className={styles.githubButton}
                onClick={handleSignInGithub}
                loading={loadingLogin}
            >
                {<FiGithub color="currentColor" size="1rem" />}
                {t('githubButton')}
            </Button>
            <p>{loginError}</p>
        </div>
    );

    // return (
    //     <form className={styles.formContainer} onSubmit={handleSubmitForm}>
    //         <div>
    //             <input
    //                 autoFocus
    //                 type="text"
    //                 name="username"
    //                 required
    //                 placeholder={t('usernamePlaceholder')}
    //                 onChange={handleChangeUsername}
    //                 value={username}
    //                 onInvalid={handleInputError}
    //                 pattern="^[a-zA-Z0-9]*$"
    //                 onInput={event => event.currentTarget.setCustomValidity('')}
    //                 title={t('inputError.notSpaces')}
    //             />
    //             <button
    //                 className={`${username ? styles.haveUsername : ''}`}
    //                 type="submit"
    //                 disabled={loadingUsername}
    //             >
    //                 {loadingUsername ? (
    //                     <div className={styles.loader} />
    //                 ) : (
    //                     <FiArrowRight color="currentColor" size="2rem" />
    //                 )}
    //             </button>
    //         </div>
    //         <label htmlFor="username">{errorSubmit}</label>
    //     </form>
    // );
};

export default LoginInput;
