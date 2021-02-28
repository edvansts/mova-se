import React, { useContext, useEffect } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.css';

const ChallengeBox: React.FC = () => {
    const { resetCountdown } = useContext(CountdownContext);

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
                        <header>Ganhe {currentChallenge.amount} xp</header>
                        <main>
                            <img
                                src={`icons/${currentChallenge.type}.svg`}
                                alt={currentChallenge.type}
                            />
                            <strong>Exercite-se</strong>
                            <p>{currentChallenge.description}</p>
                        </main>
                    </div>
                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button
                            type="button"
                            className={styles.challengeSuccededButton}
                            onClick={handleChallengeSucceeded}
                        >
                            Consegui
                        </button>
                    </footer>
                </>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio.</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="LevelUp" />
                        Complete os desafios e ganhe experiência para subir rumo
                        ao Next Level.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ChallengeBox;
