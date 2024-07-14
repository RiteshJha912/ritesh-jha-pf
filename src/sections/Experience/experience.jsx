import React from 'react';
import styles from './experienceStyles.module.css';
import InternshipCard from '../../common/internshipCard';
import deepCytesLogo from '../../assets/deepcytes.jpg';
import stallionLogo from '../../assets/TSP.jpg';

function Projects() {
  return (
    <section id='internships' className={styles.container}>
      <h1 className='sectionTitle'>Internships 💼</h1>
      <div className={styles.internshipCards}>
        <InternshipCard
          logoSrc={deepCytesLogo}
          companyName="DeepCytes Cyber Labs (UK)"
          position="Cybersecurity Analyst/Fellow"
          duration="June 2024 - Present"
        />
        <InternshipCard
          logoSrc={stallionLogo}
          companyName="The Stallion Project"
          position="Frontend Developer"
          duration="Feb 2024 - April 2024"
        />
      </div>
    </section>
  );
}

export default Projects;

