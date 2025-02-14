import React, { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import styles from './projectStyles.module.css'
import hnltech from '../../assets/hnltech.png'
import koshkeeper from '../../assets/koshkeeper.png'
import taskifyv2 from '../../assets/taskifyv2.png'
import devflipper from '../../assets/devflipper.png'
import ProjectCard from '../../common/projectCard'
import ProjectModal from '../../common/projectModal' 




function Projects() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in milliseconds
      easing: 'ease-in-out',
      once: false, // animations will trigger multiple times as elements re-enter the viewport
    })
  }, []) // runs only once when the component mounts


  //  project data storing dynamically 
  const projects = [
    {
      src: hnltech,
      h3: 'HNLTech',
      shortDesc: 'Software Company Landing Page',
      longDesc:
        'A professional website built for HNLTech Pvt. Ltd., crafted with Next.js & React.js. It enhances their digital presence with smooth animations, theme switching &  3D elements, aligning with their business goals.',
      github: 'https://github.com/RiteshJha912/hnltech',
      live: 'https://hnltech.in/',
    },
    {
      src: koshkeeper,
      h3: 'Koshkeeper',
      shortDesc: 'Expense Tracker',
      longDesc:
        'A smart expense tracker using React & Firebase. It enables secure Google login, categorizes transactions & stores financial data permanently, ensuring users can manage their expenses effortlessly with an intuitive UI.',
      github: 'https://github.com/RiteshJha912/KoshKeeper',
      live: 'https://expense-tracker99.web.app/',
    },
    {
      src: taskifyv2,
      h3: 'Taskify-V2',
      shortDesc: 'To-do list website',
      longDesc:
        'A full-stack to-do app with React, Node.js, Express & MongoDB. It provides real-time updates, persistent storage & a user-friendly task management experience with seamless cross-browser support.',
      github: 'https://github.com/RiteshJha912/TaskifyV2-UserSpecific',
      live: 'https://taskifyv2-final.onrender.com/',
    },
    {
      src: devflipper,
      h3: 'Dev-Flipper',
      shortDesc: '3D Projects Showcase',
      longDesc:
        'A 3D project showcase built with Three.js & React Three Fiber. It offers an interactive, visually appealing way to display projects in a dynamic & engaging format.',
      github: 'https://github.com/RiteshJha912/DevFlipper',
      live: 'https://dev-flipper.vercel.app/',
    },
  ]

  // manages which project is currently selected for display in the modal
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id='projects' className={styles.container}>
      <h1 className='sectionTitle'>Projects 🛠️</h1>
      <div className={styles.projectsContainer}>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            src={project.src}
            // h3={project.h3}
            p={project.p}
            onClick={() => {
              console.log('Clicked on:', project.h3)
              setSelectedProject(project)        // opens the modal with the selected project details
            }}
          />
        ))}
      </div>



      {/* renders the modal only when a project is selected */}
      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  )
}

export default Projects
