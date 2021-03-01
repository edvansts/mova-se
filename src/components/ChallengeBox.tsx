import React, { useContext, useEffect } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import useTranslation from 'next-translate/useTranslation';

import styles from '../styles/components/ChallengeBox.module.css';

const ChallengeBox: React.FC = () => {
    const { resetCountdown } = useContext(CountdownContext);

    const { t } = useTranslation();

    const {
        currentChallenge,
        failedChallenge,
        successfullyChallenge,
    } = useContext(ChallengesContext);

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
                            {t('home:winXp', {
                                amount: currentChallenge.amount,
                            })}
                        </header>
                        <main>
                            <img
                                src={`icons/${currentChallenge.type}.svg`}
                                alt={currentChallenge.type}
                            />
                            <strong>{t('home:workOut')}</strong>
                            <p>{currentChallenge.description}</p>
                        </main>
                    </div>
                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                        >
                            {t('home:failed')}
                        </button>
                        <button
                            type="button"
                            className={styles.challengeSuccededButton}
                            onClick={handleChallengeSucceeded}
                        >
                            {t('home:gotIt')}
                        </button>
                    </footer>
                </>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>{t('home:startCycleText1')}</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="LevelUp" />
                        {t('home:startCycleDesc1')}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ChallengeBox;
