import styles from '../styles/components/Countdown.module.css';

import React from 'react';
import useCountdownContext from '../hooks/useCountdownContext';
import { FiPlay, FiX, FiCheckCircle } from 'react-icons/fi';
import useTranslation from 'next-translate/useTranslation';

const Countdown: React.FC = () => {
    const { t } = useTranslation('home');

    const {
        minutes,
        seconds,
        hasFinished,
        isActiveCountdown,
        startCountdown,
        resetCountdown,
        percentageToEndCountdown,
    } = useCountdownContext();

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
                    {t('cycleClosed')}
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
                    {t('abandonCycle')}
                    <FiX />
                    <div>
                        <div
                            style={{ width: `${percentageToEndCountdown}%` }}
                        />
                    </div>
                </button>
            ) : (
                <button
                    type="button"
                    className={styles.countdownButton}
                    onClick={startCountdown}
                >
                    {t('startCycle')}
                    <FiPlay fill="currentColor" />
                </button>
            )}
        </div>
    );
};

export default Countdown;
