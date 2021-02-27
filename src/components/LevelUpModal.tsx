import React, { useContext } from 'react';

import styles from '../styles/components/LevelUpModal.module.css';

import { FiTwitter } from 'react-icons/fi';
import { ChallengesContext } from '../contexts/ChallengesContext';

const LevelUpModal: React.FC = () => {
    const { level, closeLevelUpModal} = useContext(ChallengesContext);
    
    return (
        <div className={styles.overlay} onClick={closeLevelUpModal}>
            <div
                className={styles.modalContainer}
                onClick={event => event.stopPropagation()}
            >
                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Close" />
                </button>
                <main>
                    <div>{level}</div>
                    <strong>Parabéns</strong>
                    <p>Você alcançou um novo level</p>
                    <button>
                        Compartilhar no twitter{' '}
                        <FiTwitter
                            style={{ marginLeft: '0.5rem' }}
                            fill="white"
                        />
                    </button>
                </main>
            </div>
        </div>
    );
};

export default LevelUpModal;
