import styles from '../styles/pages/Home.module.css';

import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import CountdownProvider from '../contexts/CountdownContext';
import ChallengesProvider from '../contexts/ChallengesContext';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import ChallengeBox from '../components/ChallengeBox';
import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import useTranslation from 'next-translate/useTranslation';
import SEO from '../components/SEO';
import favicon from '/public/favicon.png';
import Loader from '../components/Loader';
import CookieAdapter from '../infra/CookieAdapter';
import useUserContext from '../hooks/useUserContext';

interface Props {
    tokenCookies: string;
    randomTextShow: number;
}

export default function Home({ randomTextShow, tokenCookies }: Props) {
    const { t } = useTranslation();

    const { user, loginUser, isLoadingLoginUser } = useUserContext();

    useEffect(() => {
        if (!user) {
            loginUser(tokenCookies);
        }
    }, []);

    if (!user || isLoadingLoginUser) {
        return (
            <div className={styles.container}>
                <Loader size="3rem" position="center" />
            </div>
        );
    }

    return (
        <ChallengesProvider user={user}>
            <div className={styles.container}>
                <SEO title={t('home:title')} image={favicon.src} />

                <ExperienceBar />
                <CountdownProvider>
                    <section>
                        <div>
                            <Profile />
                            <CompletedChallenges />
                            <Countdown />
                        </div>
                        <div>
                            <ChallengeBox randomTextShow={randomTextShow} />
                        </div>
                    </section>
                </CountdownProvider>
            </div>
        </ChallengesProvider>
    );
}

export const getServerSideProps: GetServerSideProps = async context => {
    const token = context.req.cookies[CookieAdapter.getKey('token')];

    const randomTextShow = Math.ceil(Math.random() * 2);

    if (!token) {
        return { redirect: { destination: '/login', permanent: true } };
    }

    const props: Props = {
        tokenCookies: token,
        randomTextShow,
    };

    return {
        props,
    };
};
