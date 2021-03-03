import { ChangeEvent, FormEvent, useState } from 'react';

import useTranslation from 'next-translate/useTranslation';
import Cookie from 'js-cookie';

import { FiArrowRight } from 'react-icons/fi';
import useFetch from '../helpers/useFetch';
import { githubApi } from '../static/constants';

import styles from '../styles/components/LoginInput.module.css';

const LoginInput: React.FC = () => {
    const { t } = useTranslation('login');

    const [username, setUsername] = useState('');

    async function handleSubmitForm(data: FormEvent<HTMLFormElement>) {
        data.preventDefault();

        const response = await useFetch('GET', `${githubApi}/${username}`);

        console.log(response);

        // Cookie.set('username', username);
    }

    function handleChangeUsername(event: ChangeEvent<HTMLInputElement>) {
        const newUsername = event.target.value;

        setUsername(newUsername);
    }

    return (
        <form className={styles.formContainer} onSubmit={handleSubmitForm}>
            <input
                type="text"
                id="username"
                required
                placeholder={t('usernamePlaceholder')}
                onChange={handleChangeUsername}
                value={username}
            />
            <button
                className={`${username ? styles.haveUsername : ''}`}
                type="submit"
            >
                <FiArrowRight color="currentColor" size="2rem" />
            </button>
        </form>
    );
};

export default LoginInput;
