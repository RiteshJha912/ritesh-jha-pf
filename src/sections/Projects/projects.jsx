import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css' 
import styles from './projectStyles.module.css'
import cocktailbazaar from '../../assets/coactailbazaar.png'
import taskify from '../../assets/taskify.png'
import analog from '../../assets/clock.png'
import indiatimes from '../../assets/indiatimes.png'
import ProjectCard from '../../common/projectCard'

function Projects() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
      once: false,
    })
  }, [])

  return (
    <section id='projects' className={styles.container}>
      <h1 className='sectionTitle'>Projects 🛠️</h1>
      <div className={styles.projectsContainer}>
        <ProjectCard
          src={cocktailbazaar}
          link='https://github.com/RiteshJha912/cocktail-bazaar-project'
          h3='Cocktail Bazaar'
          p='Drinks Database'
        />
        <ProjectCard
          src={taskify}
          link='https://github.com/RiteshJha912/taskify-final'
          h3='Taskify'
          p='To-do list website'
        />
        <ProjectCard
          src={analog}
          link='https://github.com/RiteshJha912/analogclock'
          h3='Simple Analog Clock'
          p='Accurate Timekeeping'
        />
        <ProjectCard
          src={indiatimes}
          link='https://github.com/RiteshJha912/indiatimes.github.io'
          h3='India Times'
          p='Print media company website'
        />
      </div>
    </section>
  )
}

export default Projects
