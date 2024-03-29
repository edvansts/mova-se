import styles from '../styles/components/ChallengeBox.module.css';

import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import useCountdownContext from '../hooks/useCountdownContext';
import useChallengesContext from '../hooks/useChallengesContext';

interface Props {
    randomTextShow: number;
}

function ChallengeBox({ randomTextShow }: Props) {
    const { resetCountdown } = useCountdownContext();

    const { t } = useTranslation('home');

    const { currentChallenge, failedChallenge, successfullyChallenge } =
        useChallengesContext();

    useEffect(() => {
        if (currentChallenge) {
            const challengeElement = document.querySelector(
                `.${styles.challengeBoxContainer}`,
            );

            if (challengeElement) {
                challengeElement.scrollIntoView();
            }
        }
    }, [currentChallenge]);

    function handleChallengeSucceeded() {
        successfullyChallenge();
        resetCountdown();
    }

    function handleChallengeFailed() {
        failedChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {currentChallenge ? (
                <>
                    <div className={styles.challengeActive}>
                        <header>
                            {t('winXp', {
                                amount: currentChallenge.amount,
                            })}
                        </header>
                        <main>
                            <img
                                src={`icons/${currentChallenge.type}.svg`}
                                alt={currentChallenge.type}
                            />
                            <strong>{t('workOut')}</strong>
                            <p>{currentChallenge.description}</p>
                        </main>
                    </div>
                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                        >
                            {t('failed')}
                        </button>
                        <button
                            type="button"
                            className={styles.challengeSuccededButton}
                            onClick={handleChallengeSucceeded}
                        >
                            {t('gotIt')}
                        </button>
                    </footer>
                </>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>
                        {t(`startCycleText`, { count: randomTextShow })}
                    </strong>
                    {randomTextShow % 2 == 0 ? (
                        <div className={styles.pairShow}>
                            <img src="icons/level-up.svg" alt="LevelUp" />
                            <p>
                                {t(`startCycleDesc`, { count: randomTextShow })}
                            </p>
                        </div>
                    ) : (
                        <p>
                            <img src="icons/level-up.svg" alt="LevelUp" />
                            {t(`startCycleDesc`, { count: randomTextShow })}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default ChallengeBox;
