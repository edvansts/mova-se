import React, { useContext, useEffect, useState } from 'react';
import { FiPlay, FiX, FiCheckCircle } from 'react-icons/fi';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Countdown.module.css';

const initialTime = 0.1 * 60;

let countdownTimeout: NodeJS.Timeout;

const Countdown: React.FC = () => {
    const [time, setTime] = useState(initialTime);
    const [isActiveCountdown, setIsActiveCountdown] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const { startNewChallenge } = useContext(ChallengesContext);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes)
        .padStart(2, '0')
        .split('');

    const [secondLeft, secondRight] = String(seconds)
        .padStart(2, '0')
        .split('');

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
            const audio = new Audio('notification.mp3');
            audio.play();
        }
    }, [hasFinished]);

    function startCountdown() {
        setIsActiveCountdown(true);
    }

    function resetCountdown() {
        setIsActiveCountdown(false);
        clearTimeout(countdownTimeout);
        setTime(initialTime);
    }

    // function restartCountdown() {
    //     setHasFinished(false);
    // }

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button className={styles.countdownButton} disabled>
                    Ciclo Encerrado
                    <FiCheckCircle />
                </button>
            ) : isActiveCountdown ? (
                <button
                    type="button"
                    className={`${styles.countdownButton} ${
                        isActiveCountdown ? styles.stopCountdown : ''
                    }`}
                    onClick={resetCountdown}
                >
                    Abandonar ciclo
                    <FiX />
                </button>
            ) : (
                <button
                    type="button"
                    className={styles.countdownButton}
                    onClick={startCountdown}
                >
                    Iniciar um ciclo
                    <FiPlay />
                </button>
            )}
        </div>
    );
};

export default Countdown;
