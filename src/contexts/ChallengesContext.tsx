import React, { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import challenges from '../static/challenges.json';
import LevelUpModal from '../components/LevelUpModal';
interface ChallengesContextState {
    level: number;
    currentExperience: number;
    currentChallenge: Challenge | null;
    experienceToNextLevel: number;
    currentLevelExperience: number;
    challengesCompleted: number;
    startNewChallenge: () => void;
    failedChallenge: () => void;
    successfullyChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextState);

const ChallengeProvider: React.FC<ChallengesProviderProps> = ({
    children,
    ...rest
}) => {
    const [level, setLevel] = useState(rest.level ?? 0);
    const [currentExperience, setCurrentExperience] = useState(
        rest.currentExperience ?? 0,
    );
    const [
        currentChallenge,
        setCurrentChallenge,
    ] = useState<Challenge | null>();
    const [challengesCompleted, setChallengesCompleted] = useState(
        rest.challengesCompleted ?? 0,
    );
    const [isModalLevelUpOpened, setIsLevelUpModalOpened] = useState(false);

    const currentLevelExperience = Math.pow(level * 4, 2);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        if (currentExperience > experienceToNextLevel) {
            levelUp();
        }
    }, [currentExperience, level]);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpened(true);

        const audio = new Audio('sound/levelup.mp3');
        audio.volume = 0.75;
        audio.play();
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpened(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(
            Math.random() * challenges.length,
        );
        const newRandomChallenge = challenges[
            randomChallengeIndex
        ] as Challenge;
        setCurrentChallenge(newRandomChallenge);

        if (Notification.permission == 'granted') {
            new Notification('🛑  Novo desafio 🛑  Vamos se exercitar!', {
                body: `Valendo ${newRandomChallenge.amount}xp!`,
            });
        }
    }

    function successfullyChallenge() {
        setCurrentExperience(currentExperience + currentChallenge.amount);
        setChallengesCompleted(challengesCompleted + 1);
        setCurrentChallenge(null);
    }

    function failedChallenge() {
        setCurrentChallenge(null);
        const audio = new Audio('sound/funny-slip.mp3');
        audio.volume = 0.3;
        audio.play();
    }

    const state: ChallengesContextState = {
        level,
        currentExperience,
        currentChallenge,
        currentLevelExperience,
        experienceToNextLevel,
        challengesCompleted,
        startNewChallenge,
        failedChallenge,
        successfullyChallenge,
        closeLevelUpModal,
    };

    return (
        <ChallengesContext.Provider value={state}>
            {children}

            {isModalLevelUpOpened && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
};

export default ChallengeProvider;
