import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import useTranslation from 'next-translate/useTranslation';

import styles from '../styles/components/Profile.module.css';

const Profile: React.FC = () => {
    const { t } = useTranslation();

    const { level, user } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img src={user.photoUrl} alt={user.name || user.nickname} />
            <div>
                <strong>{user.name || user.nickname}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    {t('common:level')} {level}
                </p>
            </div>
        </div>
    );
};

export default Profile;
