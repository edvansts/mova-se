import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

import useTranslation from 'next-translate/useTranslation';
import Cookies from 'js-cookie';

import { FiArrowRight } from 'react-icons/fi';
import useFetch from '../helpers/useFetch';
import { githubApi } from '../static/constants';

import styles from '../styles/components/LoginInput.module.css';
export interface User {
    name: string;
    login: string;
    avatarUrl: string;
}

const LoginInput: React.FC = () => {
    const { t } = useTranslation('login');
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [loadingUsername, setLoadingUsername] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState('');

    async function handleSubmitForm(data: FormEvent<HTMLFormElement>) {
        data.preventDefault();
        setLoadingUsername(true);
        try {
            const response = await useFetch(
                'GET',
                `${githubApi}/users/${username}`,
            );

            if (response.ok) {
                const responseJson = await response.json();

                const user: User = {
                    name: responseJson.name,
                    login: responseJson.login,
                    avatarUrl: responseJson.avatar_url,
                };

                Cookies.set('user', user);
                Cookies.set('level', String(0));
                Cookies.set('currentExperience', String(0));
                Cookies.set('challengesCompleted', String(0));
                router.push('/', '/', { locale: router.locale });
            } else {
                setErrorSubmit(t('inputError.notFound'));
            }
        } catch (err) {
            setErrorSubmit(t('inputError.notFound'));
        }

        setLoadingUsername(false);
    }

    function handleChangeUsername(event: ChangeEvent<HTMLInputElement>) {
        const newUsername = event.target.value;

        setUsername(newUsername);
    }

    function handleInputError(event: FormEvent<HTMLInputElement>) {
        const field = event.currentTarget;

        if (!field.value)
            return field.setCustomValidity(t('inputError.required'));

        // if (field.value.includes(' '))
        //     return field.setCustomValidity(t('inputError.notSpaces'));
    }

    return (
        <form className={styles.formContainer} onSubmit={handleSubmitForm}>
            <div>
                <input
                    autoFocus
                    type="text"
                    id="username"
                    required
                    placeholder={t('usernamePlaceholder')}
                    onChange={handleChangeUsername}
                    value={username}
                    onInvalid={handleInputError}
                    pattern="^[a-zA-Z0-9]*$"
                    onInput={event => event.currentTarget.setCustomValidity('')}
                    title={t('inputError.notSpaces')}
                />
                <button
                    className={`${username ? styles.haveUsername : ''}`}
                    type="submit"
                    disabled={loadingUsername}
                >
                    {loadingUsername ? (
                        <div className={styles.loader} />
                    ) : (
                        <FiArrowRight color="currentColor" size="2rem" />
                    )}
                </button>
            </div>
            <label htmlFor="username">{errorSubmit}</label>
        </form>
    );
};

export default LoginInput;
