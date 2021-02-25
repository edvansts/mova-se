import React, {
    createContext,
    Dispatch,
    ReactNode,
    useEffect,
    useState,
} from 'react';

interface State {
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

    function successfullyChallenge() {
        setCurrentExperience(currentExperience + currentChallenge.amount);
        setChallengesCompleted(challengesCompleted + 1);
        setCurrentChallenge(null);
    }

    function failedChallenge() {
        setCurrentChallenge(null);
    }

    const state: State = {
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
