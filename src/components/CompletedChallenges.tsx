import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import useTranslation from 'next-translate/useTranslation';

import styles from '../styles/components/CompletedChallenges.module.css';

const CompletedChallenges: React.FC = () => {
    const { t } = useTranslation();

    const { challengesCompleted } = useContext(ChallengesContext);

    return (
        <div className={styles.completedChallengesContainer}>
            <span>{t("home:challengesCompleted")}</span>
            <span>{challengesCompleted}</span>
        </div>
    );
};

export default CompletedChallenges;
