import React from 'react';
import styles from '../sections/Experience/experienceStyles.module.css'; // Adjust path as needed

function InternshipCard({
  logoSrc,
  companyName,
  position,
  duration,
  aosEffect,
}) {
  return (
    <div className={styles.internshipCard} data-aos={aosEffect}>
      <div className={styles.logoContainer}>
        <img
          className={styles.logo}
          src={logoSrc}
          alt={`${companyName} logo`}
        />
      </div>
      <div className={styles.details}>
        <h3>{companyName}</h3>
        <p>
          <strong>Position:</strong> {position}
        </p>
        <p>
          <strong>Duration:</strong> {duration}
        </p>
      </div>
    </div>
  )
}

export default InternshipCard;
