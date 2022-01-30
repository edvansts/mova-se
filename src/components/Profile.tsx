import styles from '../styles/components/Profile.module.css';

import React from 'react';
import useChallengesContext from '../hooks/useChallengesContext';
import useTranslation from 'next-translate/useTranslation';

const Profile: React.FC = () => {
    const { t } = useTranslation();

    const { level, user } = useChallengesContext();

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
