import React, { createContext, ReactNode, useEffect, useState } from 'react';
import useChallengesContext from '../hooks/useChallengesContext';

interface CountdownContextState {
    minutes: number;
    seconds: number;
    time: number;
    isActiveCountdown: boolean;
    hasFinished: boolean;
    percentageToEndCountdown: number;
    startCountdown: () => void;
    resetCountdown: () => void;
}

export const CountdownContext = createContext({} as CountdownContextState);

interface CountdownProviderProps {
    children: ReactNode;
}

const initialTime = 25 * 60;

let countdownTimeout: NodeJS.Timeout;

const CountdownProvider: React.FC<CountdownProviderProps> = ({ children }) => {
    const { startNewChallenge } = useChallengesContext();

    const [time, setTime] = useState(initialTime);
    const [isActiveCountdown, setIsActiveCountdown] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const percentageToEndCountdown = Math.round(
        ((initialTime - time) * 100) / initialTime,
    );

    useEffect(() => {
        if (isActiveCountdown && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActiveCountdown && time == 0) {
            setIsActiveCountdown(false);
            setHasFinished(true);
            startNewChallenge();
        }
    }, [time, isActiveCountdown]);

    useEffect(() => {
        if (hasFinished) {
            const audio = new Audio('sound/notification.mp3');
            audio.play();
        }
    }, [hasFinished]);

    function startCountdown() {
        setIsActiveCountdown(true);
    }

    function resetCountdown() {
        setIsActiveCountdown(false);
        setHasFinished(false);

        setTime(initialTime);
        clearTimeout(countdownTimeout);
    }

    const state: CountdownContextState = {
        minutes,
        seconds,
        time,
        isActiveCountdown,
        hasFinished,
        percentageToEndCountdown,
        startCountdown,
        resetCountdown,
    };

    return (
        <CountdownContext.Provider value={state}>
            {children}
        </CountdownContext.Provider>
    );
};

export default CountdownProvider;
