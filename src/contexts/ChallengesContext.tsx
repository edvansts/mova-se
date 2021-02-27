import React, { createContext, ReactNode, useEffect, useState } from 'react';

import challenges from '../static/challenges.json';
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
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

// const initialState: ChallengesContextState = {
//     hasFinishedCountdown: false,
//     level: 1,
//     currentExperience: 0,
// };

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextState);

const ChallengeProvider: React.FC<ChallengesProviderProps> = ({ children }) => {
    const [level, setLevel] = useState(0);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [
        currentChallenge,
        setCurrentChallenge,
    ] = useState<Challenge | null>();
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const currentLevelExperience = Math.pow(level * 4, 2);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        if (currentExperience > experienceToNextLevel) {
            levelUp();
        }
    }, [currentExperience, level]);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    function levelUp() {
        setLevel(level + 1);
        const audio = new Audio('sound/levelup.mp3');
        audio.volume = 0.75;
        audio.play();
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
            new Notification(
                '🛑  Novo desafio 🛑  Vamos se exercitar!', {
                    body: `Valendo ${newRandomChallenge.amount}xp!`
                },
            );
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
    };

    return (
        <ChallengesContext.Provider value={state}>
            {children}
        </ChallengesContext.Provider>
    );
};

export default ChallengeProvider;
