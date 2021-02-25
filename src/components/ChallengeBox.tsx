import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ChallengeBox.module.css';

const ChallengeBox: React.FC = () => {
    const {
        currentChallenge,
        failedChallenge,
        successfullyChallenge,
    } = useContext(ChallengesContext);

    return (
        <div className={styles.challengeBoxContainer}>
            {currentChallenge ? (
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
                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={failedChallenge}
                        >
                            Falhei
                        </button>
                        <button
                            type="button"
                            className={styles.challengeSuccededButton}
                            onClick={successfullyChallenge}
                        >
                            Consegui
                        </button>
                    </footer>
                </div>
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
