import Head from 'next/head';
import Image from 'next/image';
import { GetServerSideProps } from 'next';

import useTranslation from 'next-translate/useTranslation';

import LoginInput from '../components/LoginInput';

import styles from '../styles/pages/Login.module.css';
import SEO from '../components/SEO';
import useSWR from 'swr';

const fetcher = async url => {
    const res = await fetch(url);
    const data = await res.json();

    if (res.status !== 200) {
        throw new Error(data.message);
    }
    return data;
};

export default function Login() {
    const { t } = useTranslation('');
    const { data, error } = useSWR(
        `/api/users/${'-MVe5LrxnX5vw7yY3PTU'}`,
        fetcher,
    );

    console.log(data);
    // console.log(error);

    return (
        <div className={styles.loginContainer}>
            <SEO title={t('login:title')} image="favicon.png" />

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
