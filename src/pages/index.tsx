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
import CookieAdapter from '../infra/CookieAdapter';

import styles from '../styles/pages/Home.module.css';
import useUser from '../hooks/useUser';
import Loader from '../components/Loader';
import { useEffect } from 'react';

interface Props {
    token: string;
    randomTextShow: number;
}

export default function Home({ randomTextShow, token }: Props) {
    const { t } = useTranslation();

    const { user, loginUser, isLoadingLoginUser } = useUser();

    useEffect(() => {
        if (!user) {
            loginUser(token);
        }
    }, []);

    if (!user || isLoadingLoginUser) {
        return <Loader size="3rem" position="center" />;
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
        token,
        randomTextShow,
    };

    return {
        props,
    };
};
