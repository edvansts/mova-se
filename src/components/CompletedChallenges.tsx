import styles from '../styles/components/CompletedChallenges.module.css';

import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import useChallengesContext from '../hooks/useChallengesContext';

const CompletedChallenges: React.FC = () => {
    const { t } = useTranslation('home');

    const { challengesCompleted } = useChallengesContext();

    return (
        <div className={styles.completedChallengesContainer}>
            <span>{t('challengesCompleted')}</span>
            <span>{challengesCompleted}</span>
        </div>
    );
};

export default CompletedChallenges;
