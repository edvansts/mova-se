import React, { useContext } from 'react';

import styles from '../styles/components/LevelUpModal.module.css';

import { FiTwitter } from 'react-icons/fi';
import { ChallengesContext } from '../contexts/ChallengesContext';

import useTranslation from 'next-translate/useTranslation';

const LevelUpModal: React.FC = () => {
    const { t } = useTranslation();

    const { level, closeLevelUpModal } = useContext(ChallengesContext);

    return (
        <div className={styles.overlay} onClick={closeLevelUpModal}>
            <div
                className={styles.modalContainer}
                onClick={event => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={closeLevelUpModal}
                    className={styles.closeButton}
                >
                    <img src="/icons/close.svg" alt="Close" />
                </button>
                <main>
                    <div>{level}</div>
                    <strong>{t('home:congrats')}</strong>
                    <p>{t('home:reachedNextLevel')}</p>
                </main>
                <button type="button" className={styles.shareButton}>
                    <span>
                        {t('home:shareOn', { socialMedia: 'twitter' })}
                        <FiTwitter
                            style={{ marginLeft: '0.5rem' }}
                            fill="currentColor"
                        />
                    </span>
                </button>
            </div>
        </div>
    );
};

export default LevelUpModal;
