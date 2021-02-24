import React, { createContext, Dispatch, ReactNode, useState } from 'react';

interface State {
    level: number;
    currentExperience: number;
    currentChallenge: Challenge | null;
    startNewChallenge: () => void;
    levelUp: () => void;
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

import challenges from '../static/challenges.json';

// const initialState: State = {
//     hasFinishedCountdown: false,
//     level: 1,
//     currentExperience: 0,
// };

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as State);

const ChallengeProvider: React.FC<ChallengesProviderProps> = ({ children }) => {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [
        currentChallenge,
        setCurrentChallenge,
    ] = useState<Challenge | null>();

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(
            Math.random() * challenges.length,
        );
        const newRandomChallenge = challenges[
            randomChallengeIndex
        ] as Challenge;
        setCurrentChallenge(newRandomChallenge);
    }

    const state = {
        level,
        currentExperience,
        levelUp,
        startNewChallenge,
        currentChallenge,
    };

    return (
        <ChallengesContext.Provider value={state}>
            {children}
        </ChallengesContext.Provider>
    );
};

export default ChallengeProvider;
