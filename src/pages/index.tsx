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
import { User } from '../models/User';

import styles from '../styles/pages/Home.module.css';

interface Props {
    user: User;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    randomTextShow: number;
}

export default function Home({
    user,
    challengesCompleted,
    currentExperience,
    level,
    randomTextShow,
}: Props) {
    const { t } = useTranslation();

    return (
        <ChallengesProvider
            level={level}
            currentExperience={currentExperience}
            challengesCompleted={challengesCompleted}
            user={user}
        >
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
    const { level, currentExperience, challengesCompleted, user } =
        context.req.cookies;

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

    const props: Props = {
        level: Number(level) || 0,
        currentExperience: Number(currentExperience) || 0,
        challengesCompleted: Number(challengesCompleted) || 0,
        randomTextShow: randomTextShow,
        user: JSON.parse(user) as User,
    };

    return {
        props,
    };
};
