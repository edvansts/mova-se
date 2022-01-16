import Image from 'next/image';
import { GetServerSideProps } from 'next';
import LoginInput from '../components/LoginInput';
import useTranslation from 'next-translate/useTranslation';
import SEO from '../components/SEO';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import favicon from '/public/favicon.png';

import styles from '../styles/pages/Login.module.css';

export default function Login() {
    const { t } = useTranslation('');

    const router = useRouter();

    useEffect(() => {
        router.prefetch('/');
    }, []);

    return (
        <div className={styles.loginContainer}>
            <SEO title={t('login:title')} image={favicon.src} />

            <div className={styles.loginContent}>
                <div className={styles.logoImg}>
                    <Image
                        src="/icons/logo.svg"
                        alt="Logo"
                        width={360}
                        height={76}
                    />
                </div>

                <strong>{t('login:welcome')}</strong>
                <div className={styles.loginToStart}>
                    <Image
                        src="/icons/github.svg"
                        alt="Github"
                        width={40}
                        height={40}
                    />
                    <span>{t('login:loginToStart')}</span>
                </div>

                <LoginInput />
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async context => {
    if (context.req.cookies.user) {
        return {
            props: {},
            redirect: {
                destination: `${
                    context.locale != context.defaultLocale
                        ? `/${context.locale}`
                        : ''
                }/`,
            },
        };
    }
    return { props: {} };
};
