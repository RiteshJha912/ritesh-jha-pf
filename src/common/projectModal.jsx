import React from 'react'
import styles from './projectModal.module.css'
import { FaGithub } from 'react-icons/fa'

function ProjectModal({ isOpen, onClose, project }) {
  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <img src={project.src} alt={project.h3} className={styles.image} />
        <h2>{project.h3}</h2>
        <p>{project.longDesc}</p> {/* Show long description only in modal */}
        <div className={styles.footer}>
          <a href={project.github} target='_blank' rel='noopener noreferrer'>
            <FaGithub className={styles.githubIcon} />
          </a>
          <a
            href={project.live}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.viewLive}
          >
            View Live
          </a>
        </div>
      </div>
    </div>
  )
}


export default ProjectModal
