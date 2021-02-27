import CountdownProvider from '../contexts/CountdownContext';
import ChallengesProvider from '../contexts/ChallengesContext';

import Head from 'next/head';
import { GetServerSideProps } from 'next';

import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import ChallengeBox from '../components/ChallengeBox';
import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';

import styles from '../styles/pages/Home.module.css';

export default function Home(props) {
    return (
        <ChallengesProvider
            level={props.level}
            currentExperience={props.currentExperience}
            challengesCompleted={props.challengesCompleted}
        >
            <div className={styles.container}>
                <Head>
                    <title>Início | Mova-se</title>
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
                            <ChallengeBox />
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
    } = context.req.cookies;

    const userInfo = {
        level: Number(level),
        currentExperience: Number(currentExperience),
        challengesCompleted: Number(challengesCompleted),
    };

    return {
        props: userInfo,
    };
};
