import React, { useContext, } from 'react';
import { FiPlay, FiX, FiCheckCircle } from 'react-icons/fi';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css';

const Countdown: React.FC = () => {
    const {
        minutes,
        seconds,
        hasFinished,
        isActiveCountdown,
        startCountdown,
        resetCountdown,
    } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes)
        .padStart(2, '0')
        .split('');

    const [secondLeft, secondRight] = String(seconds)
        .padStart(2, '0')
        .split('');

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
