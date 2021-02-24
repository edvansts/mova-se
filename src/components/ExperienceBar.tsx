import styles from "../styles/components/ExperienceBar.module.css";
import React from "react";

const ExperienceBar: React.FC = () => {
  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: "60%" }} />
        <span className={styles.currentExperience} style={{ left: "60%" }}>
          400 xp
        </span>
      </div>
      <span>600 xp</span>
    </header>
  );
};

export default ExperienceBar;
