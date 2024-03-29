import styles from '../styles/components/LevelUpModal.module.css';

import React from 'react';
import useChallengesContext from '../hooks/useChallengesContext';
import { FiTwitter } from 'react-icons/fi';
import useTranslation from 'next-translate/useTranslation';


const LevelUpModal: React.FC = () => {
    const { t } = useTranslation('home');

    const { level, closeLevelUpModal } = useChallengesContext();

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
                    <strong>{t('congrats')}</strong>
                    <p>{t('reachedNextLevel')}</p>
                </main>
                <button type="button" className={styles.shareButton}>
                    <span>
                        {t('shareOn', { socialMedia: 'twitter' })}
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
