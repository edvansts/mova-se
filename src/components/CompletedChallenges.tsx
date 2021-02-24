import React from 'react';

import styles from "../styles/components/CompletedChallenges.module.css";

const CompletedChallenges: React.FC = () => {
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios Completados</span>
      <span>01</span>
    </div>
  );
};

export default CompletedChallenges;
