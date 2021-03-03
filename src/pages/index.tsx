import CountdownProvider from '../contexts/CountdownContext';
import ChallengesProvider from '../contexts/ChallengesContext';

import Head from 'next/head';
import { GetServerSideProps } from 'next';

import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import ChallengeBox from '../components/ChallengeBox';
import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';

import useTranslation from 'next-translate/useTranslation';

import styles from '../styles/pages/Home.module.css';
import { User } from '../components/LoginInput';

export default function Home(props) {
    const { t } = useTranslation();

    const user: User = {
        ...props.user,
    };

    return (
        <ChallengesProvider
            level={props.level}
            currentExperience={props.currentExperience}
            challengesCompleted={props.challengesCompleted}
            user={user}
        >
            <div className={styles.container}>
                <Head>
                    <title>
                        {t('home:title')} | {t('common:appName')}
                    </title>
                </Head>

                <ExperienceBar />
                <CountdownProvider>
                    <section>
                        <div>
                            <Profile />
                            <CompletedChallenges />
                            <Countdown />
                        </div>
                        <div>
                            <ChallengeBox
                                randomTextShow={props.randomTextShow}
                            />
                        </div>
                    </section>
                </CountdownProvider>
            </div>
        </ChallengesProvider>
    );
}

export const getServerSideProps: GetServerSideProps = async context => {
    const {
        level,
        currentExperience,
        challengesCompleted,
        user,
    } = context.req.cookies;

    const randomTextShow = Math.ceil(Math.random() * 2);

    if (!user) {
        return {
            props: {},
            redirect: {
                destination: `${
                    context.locale != context.defaultLocale
                        ? `/${context.locale}`
                        : ''
                }/login`,
            },
        };
    }

    const userInfo = {
        level: Number(level) || 0,
        currentExperience: Number(currentExperience) || 0,
        challengesCompleted: Number(challengesCompleted) || 0,
        randomTextShow: randomTextShow,
        user: JSON.parse(user) as User,
    };

    return {
        props: userInfo,
    };
};
