import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './experienceStyles.module.css'
import deepCytesLogo from '../../assets/deepcytes.jpg'
import stallionLogo from '../../assets/TSP.jpg'
import noxAlgologo from '../../assets/noxalgo.jpg'
import smowCodelogo from '../../assets/smowcode.jpeg'
import { FaChevronDown } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const ExperienceCard = ({ exp, index, isExpanded, onToggle }) => {
  const cardRef = useRef(null)
  
  // Sync state changes to CSS variables immediately (even without mouse movement)
  useEffect(() => {
    if (!cardRef.current) return;
    
    if (isExpanded) {
        // Reset tilt and scale up
        cardRef.current.style.setProperty('--x-rot', '0deg');
        cardRef.current.style.setProperty('--y-rot', '0deg');
        cardRef.current.style.setProperty('--scale', '1.02');
    } else {
        // Reset to neutral if not hovering, or handleMouseMove will pick up
        // We set scale back to 1.
        cardRef.current.style.setProperty('--scale', '1');
        // We don't necessarily reset rotation here because mouse might still be hovering?
        // Actually, if we just collapsed, we might want to reset or let mouse move handle it.
        // Let's reset to be safe/clean.
        cardRef.current.style.setProperty('--x-rot', '0deg');
        cardRef.current.style.setProperty('--y-rot', '0deg');
    }
  }, [isExpanded]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage position
    const xPct = x / rect.width;
    const yPct = y / rect.height;
    
    // Calculate rotation (max +/- 5 degrees)
    const xRot = (0.5 - yPct) * 10;
    const yRot = (xPct - 0.5) * 10;
    
    if (isExpanded) {
        cardRef.current.style.setProperty('--x-rot', '0deg');
        cardRef.current.style.setProperty('--y-rot', '0deg');
        cardRef.current.style.setProperty('--scale', '1.02');
    } else {
        cardRef.current.style.setProperty('--x-rot', `${xRot}deg`);
        cardRef.current.style.setProperty('--y-rot', `${yRot}deg`);
        cardRef.current.style.setProperty('--scale', '1');
    }

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    // Reset rotation smoothly on leave
    cardRef.current.style.setProperty('--x-rot', `0deg`);
    cardRef.current.style.setProperty('--y-rot', `0deg`);
    // Scale follows expanded state
    cardRef.current.style.setProperty('--scale', isExpanded ? '1.02' : '1');
  };

  return (
    <div
      ref={cardRef}
      className={styles.cardWrapper}
      style={{
        zIndex: isExpanded ? 50 : index + 1, // Ensure expanded cards pop above others
        top: `calc(130px + ${index * 50}px)`, 
      }}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div 
        className={styles.card}
        data-expanded={isExpanded}
        onClick={onToggle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.spotlight} />
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
    </div>
  )
}

function Experience() {
  const [expandedId, setExpandedId] = useState(null)
  const containerRef = useRef(null)

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
    <section className={styles.section} id="internships" ref={containerRef}>
      <h1 className="sectionTitle">Experience</h1>

      <div className={styles.cardsContainer}>
        {experiences.map((exp, index) => (
            <ExperienceCard 
                key={exp.id} 
                exp={exp} 
                index={index} 
                isExpanded={expandedId === exp.id}
                onToggle={() => toggleExpand(exp.id)}
            />
        ))}
      </div>
    </section>
  )
}

export default Experience
