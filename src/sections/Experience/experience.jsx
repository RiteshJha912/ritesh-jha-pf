import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import styles from './experienceStyles.module.css'
import InternshipCard from '../../common/internshipCard'
import deepCytesLogo from '../../assets/deepcytes.jpg'
import stallionLogo from '../../assets/TSP.jpg'
import noxAlgologo from '../../assets/noxalgo.jpg'

function Internships() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-in-out',
      once: false,
    })
  }, [])

  return (
    <section id='internships' className={styles.container}>
      <h1 className='sectionTitle'>Experience 💼</h1>
      <h3 className={styles.workExperience}>Total Work Ex: 10 months</h3>
      <div className={styles.internshipCards}>
        <InternshipCard
          logoSrc={noxAlgologo}
          companyName='NOXALGO'
          position='Development Team Lead'
          duration='Dec 2024 - Feb 2025'
          aosEffect='fade-down'
        />
        <InternshipCard
          logoSrc={deepCytesLogo}
          companyName='DeepCytes Cyber Labs (UK)'
          position='Cybersecurity Analyst/Fellow'
          duration='June 2024 - Dec 2024'
          aosEffect='fade-down'
        />
        <InternshipCard
          logoSrc={stallionLogo}
          companyName='The Stallion Project'
          position='Frontend Developer'
          duration='Feb 2024 - April 2024'
          aosEffect='fade-down'
        />
      </div>
    </section>
  )
}

export default Internships
