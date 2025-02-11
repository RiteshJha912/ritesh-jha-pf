import React, { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import styles from './projectStyles.module.css'
import cocktailbazaar from '../../assets/coactailbazaar.png'
import taskify from '../../assets/taskify.png'
import analog from '../../assets/clock.png'
import indiatimes from '../../assets/indiatimes.png'
import ProjectCard from '../../common/projectCard'
import ProjectModal from '../../common/projectModal' 

function Projects() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
      once: false,
    })
  }, [])

  const projects = [
    {
      src: cocktailbazaar,
      h3: 'Cocktail Bazaar',
      shortDesc: 'Drinks Database',
      longDesc:
        'A web application that provides a vast collection of cocktail recipes, ingredient details, and preparation steps. Users can search for drinks, explore trending cocktails, and even save favorites. Built with React and integrates external API for real-time data.',
      github: 'https://github.com/RiteshJha912/cocktail-bazaar-project',
      live: 'https://cocktail-bazaar-reactproject.netlify.app/',
    },
    {
      src: taskify,
      h3: 'Taskify',
      shortDesc: 'To-do list website',
      longDesc:
        'A simple yet powerful to-do list application designed for productivity. Users can create tasks, set deadlines, and mark completed items. Features include drag-and-drop reordering and local storage to save tasks persistently.',
      github: 'https://github.com/RiteshJha912/taskify-final',
      live: 'https://taskify-reactsite.netlify.app/',
    },
    {
      src: analog,
      h3: 'Simple Analog Clock',
      shortDesc: 'Accurate Timekeeping',
      longDesc:
        'A minimalistic analog clock that accurately displays real-time hours, minutes, and seconds. Designed with CSS animations and JavaScript for smooth transitions. Perfect for embedding in dashboards or personal projects.',
      github: 'https://github.com/RiteshJha912/analogclock',
      live: 'https://riteshjha912.github.io/analogclock/',
    },
    {
      src: indiatimes,
      h3: 'India Times',
      shortDesc: 'Print media company website',
      longDesc:
        'A modernized digital platform for a renowned print media company. Provides real-time news updates, categorized articles, and a seamless reading experience. Built with React and optimized for performance and accessibility.',
      github: 'https://github.com/RiteshJha912/indiatimes.github.io',
      live: 'https://riteshjha912.github.io/indiatimes.github.io/',
    },
  ]



  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id='projects' className={styles.container}>
      <h1 className='sectionTitle'>Projects 🛠️</h1>
      <div className={styles.projectsContainer}>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            src={project.src}
            h3={project.h3}
            p={project.p}
            onClick={() => {
              console.log('Clicked on:', project.h3) 
              setSelectedProject(project)
            }}
          />
        ))}
      </div>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  )
}

export default Projects
