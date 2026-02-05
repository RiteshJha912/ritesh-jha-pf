import React, { useEffect } from 'react';
import styles from './projectStyles.module.css';
import hnltech from '../../assets/hnltech.png';
import koshkeeper from '../../assets/koshkeeper.png';
import taskifyv2 from '../../assets/taskifyv2.png';
import devflipper from '../../assets/devflipper.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Projects() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  const projects = [
    {
      src: hnltech,
      h3: 'HNLTech',
      shortDesc: 'Software Company Landing Page',
      longDesc:
        'A professional website built for HNLTech Pvt. Ltd., crafted with Next.js & React.js. It enhances their digital presence with smooth animations, theme switching & 3D elements.',
      github: 'https://github.com/RiteshJha912/hnltech',
      live: 'https://hnltech.in/',
    },
    {
      src: koshkeeper,
      h3: 'Koshkeeper',
      shortDesc: 'Expense Tracker',
      longDesc:
        'A smart expense tracker using React & Firebase. It enables secure Google login, categorizes transactions & stores financial data permanently.',
      github: 'https://github.com/RiteshJha912/KoshKeeper',
      live: 'https://expense-tracker99.web.app/',
    },
    {
      src: taskifyv2,
      h3: 'Taskify-V2',
      shortDesc: 'To-do list website',
      longDesc:
        'A full-stack to-do app with React, Node.js, Express & MongoDB. It provides real-time updates, persistent storage & a user-friendly task management experience.',
      github: 'https://github.com/RiteshJha912/TaskifyV2-UserSpecific',
      live: 'https://taskifyv2-final.onrender.com/',
    },
    {
      src: devflipper, // Kept in data for future use, but not rendered currently
      h3: 'Dev-Flipper',
      shortDesc: '3D Projects Showcase',
      longDesc:
        'A 3D project showcase built with Three.js & React Three Fiber. It offers an interactive, visually appealing way to display projects.',
      github: 'https://github.com/RiteshJha912/DevFlipper',
      live: 'https://dev-flipper.vercel.app/',
    },
  ];

  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Projects 🛠️</h1>
      
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <div 
            key={index} 
            className={styles.card}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className={styles.imagePlaceholder}></div>
            
            <div className={styles.content}>
              <div className={styles.textGroup}>
                <h3>{project.h3}</h3>
                <p className={styles.shortDesc}>{project.shortDesc}</p>
                <p className={styles.longDesc}>{project.longDesc}</p>
              </div>

              <div className={styles.links}>
                <a href={project.github} target="_blank" rel="noreferrer" className={styles.linkBtn}>
                  GitHub
                </a>
                <a href={project.live} target="_blank" rel="noreferrer" className={styles.linkBtn}>
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
