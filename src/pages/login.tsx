import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/pages/Login.module.css';

import useTranslation from 'next-translate/useTranslation';

export default function Login() {
    const { t } = useTranslation('');

    return (
        <div className={styles.loginContainer}>
            <Head>
                <title>
                    {t('login:title')} | {t('common:appName')}
                </title>
            </Head>

            <div className={styles.loginContent}>
                <Image
                    src="/icons/logo.svg"
                    alt="Logo"
                    width=""
                    height=""
                />

                <strong>{t('login:welcome')}</strong>
                <p>
                    <Image
                        src="/icons/github.svg"
                        alt="Github"
                        width={40}
                        height={40}
                    />
                    {t('login:loginToStart')}
                </p>

                <input type="text" name="" id="" />
            </div>
        </div>
    );
}
