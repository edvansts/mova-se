import styles from '../styles/components/ExperienceBar.module.css';

import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import useChallengesContext from '../hooks/useChallengesContext';

const ExperienceBar: React.FC = () => {
    const { t } = useTranslation();

    const { currentExperience, experienceToNextLevel, currentLevelExperience } =
        useChallengesContext();

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
