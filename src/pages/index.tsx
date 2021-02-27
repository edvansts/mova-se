import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';

import CountdownProvider from '../contexts/CountdownContext';

import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';
import ChallengeBox from '../components/ChallengeBox';

export default function Home() {
    return (
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
    );
}
