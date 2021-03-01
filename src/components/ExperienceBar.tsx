import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import useTranslation from 'next-translate/useTranslation';

import styles from '../styles/components/ExperienceBar.module.css';

const ExperienceBar: React.FC = () => {
    const { t } = useTranslation();

    const {
        currentExperience,
        experienceToNextLevel,
        currentLevelExperience,
    } = useContext(ChallengesContext);

    const percentageToNextLevel = Math.round(
        ((currentExperience - currentLevelExperience) * 100) /
            (experienceToNextLevel - currentLevelExperience),
    );

    return (
        <header className={styles.experienceBar}>
            {currentLevelExperience != currentExperience ? (
                <span>{currentLevelExperience} xp</span>
            ) : (
                ''
            )}
            <div>
                <div style={{ width: `${percentageToNextLevel || 0}%` }} />
                <span
                    className={styles.currentExperience}
                    style={{ left: `${percentageToNextLevel || 0}%` }}
                >
                    {currentExperience} {t('common:xp')}
                </span>
            </div>
            {experienceToNextLevel != currentExperience && (
                <span>
                    {experienceToNextLevel} {t('common:xp')}
                </span>
            )}
        </header>
    );
};

export default ExperienceBar;
