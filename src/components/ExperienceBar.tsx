import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ExperienceBar.module.css';

const ExperienceBar: React.FC = () => {
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
                    {currentExperience} xp
                </span>
            </div>
            {experienceToNextLevel != currentExperience && (
                <span>{experienceToNextLevel} xp</span>
            )}
        </header>
    );
};

export default ExperienceBar;
