import React, { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import styles from './experienceStyles.module.css'
import deepCytesLogo from '../../assets/deepcytes.jpg'
import stallionLogo from '../../assets/TSP.jpg'
import noxAlgologo from '../../assets/noxalgo.jpg'
import smowCodelogo from '../../assets/smowcode.jpeg'
import { FaChevronDown } from 'react-icons/fa'

function Experience() {
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const experiences = [
    {
      id: 1,
      company: 'SmowCode',
      role: 'Software Developer (AI)',
      date: 'May 2025 - July 2025',
      logo: smowCodelogo,
      idBadge: 'DEV-AI1',
      desc: [
        'Developed and optimized AI-driven features using Python and React.',
        'Collaborated with cross-functional teams to integrate LLM endpoints.',
        'Improved application performance by 15% through code refactoring.',
      ],
    },
    {
      id: 2,
      company: 'NOXALGO',
      role: 'Development Team Lead',
      date: 'Dec 2024 - Feb 2025',
      logo: noxAlgologo,
      idBadge: 'DEV-TL1',
      desc: [
        'Led a team of 4 developers in building scalable web solutions.',
        'Architected the frontend infrastructure using React, Redux, and Node.js.',
        'Managed sprint planning, code reviews, and CI/CD pipelines.',
      ],
    },
    {
      id: 3,
      company: 'DeepCytes Cyber Labs',
      role: 'Cybersecurity Analyst',
      date: 'June 2024 - Dec 2024',
      logo: deepCytesLogo,
      idBadge: 'SEC-OPS',
      desc: [
        'Performed vulnerability assessments and penetration testing on web apps.',
        'Analyzed security logs to identify potential threats and anomalies.',
        'Automated security reporting using Python scripts.',
      ],
    },
    {
      id: 4,
      company: 'The Stallion Project',
      role: 'Frontend Developer',
      date: 'Feb 2024 - April 2024',
      logo: stallionLogo,
      idBadge: 'DEV-FE1',
      desc: [
        'Designed and implemented responsive UI components using React.',
        'Collaborated with UX designers to ensure pixel-perfect implementation.',
        'Optimized frontend performance for faster load times.',
      ],
    },
  ]

  return (
    <section className={styles.section} id="internships">
      <h1 className="sectionTitle">Experience</h1>

      <div className={styles.cardsContainer}>
        {experiences.map((exp, index) => {
           const isExpanded = expandedId === exp.id;
           return (
            <div
              key={exp.id}
              className={styles.card}
              data-expanded={isExpanded}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              onClick={() => toggleExpand(exp.id)}
              style={{
                top: `calc(130px + ${index * 50}px)`, // Sticky stacking offset
                zIndex: index + 1,
              }}
            >
              {/* Decorative Elements */}
              <div className={styles.barcode} />
              <div className={styles.watermark}>
                {exp.company === 'The Stallion Project' ? 'Stallion' : exp.company.split(' ')[0]}
              </div>
  
              <div className={styles.header}>
                <img src={exp.logo} alt={`${exp.company} Logo`} className={styles.logo} />
                <div className={styles.titleArea}>
                  <h3 className={styles.company}>{exp.company}</h3>
                  <h4 className={styles.role}>{exp.role}</h4>
                </div>
                <FaChevronDown className={styles.arrowIcon} />
              </div>
  
              <div className={styles.metaInfo}>
                 <span className={styles.idBadge}>ID: {exp.idBadge}</span>
                 <span className={styles.duration}>{exp.date}</span>
              </div>
  
              <div className={`${styles.content} ${isExpanded ? styles.expandedContent : ''}`}>
                <ul className={styles.bulletList}>
                  {exp.desc.map((point, i) => (
                    <li key={i} className={styles.bulletItem}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
           )
        })}
      </div>
    </section>
  )
}

export default Experience
