import styles from '../styles/components/LoginInput.module.css';

import { useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { FiGithub } from 'react-icons/fi';
import { User } from '../models/User';
import userProvider from '../hooks/useProvider';
import Button from './Button';
import useUserContext from '../hooks/useUserContext';

const LoginInput: React.FC = () => {
    const { t } = useTranslation('login');

    const router = useRouter();

    const { githubSignIn } = userProvider();

    const { createUser } = useUserContext();

    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loginError, setLoginError] = useState('');

    async function handleSignInGithub() {
        setLoadingLogin(true);

        try {
            const result = await githubSignIn();

            if (result) {
                router.push('/');
            }
        } catch (err) {
            setLoginError(t('inputError.unexpected'));
        } finally {
            setLoadingLogin(false);
        }
    }

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
            <p className="text-error">{loginError}</p>
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
