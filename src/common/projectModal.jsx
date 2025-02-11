import React from 'react'
import styles from './projectModal.module.css'
import { FaGithub } from 'react-icons/fa'
import { FaArrowUpRightDots } from 'react-icons/fa6' 

function ProjectModal({ isOpen, onClose, project }) {
  if (!isOpen || !project) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <img
          src={project.src}
          alt={project.h3}
          className={styles.projectImage}
        />
        <h2 className={styles.modalHeading}>{project.h3}</h2>
        <p className={styles.modalDescription}>{project.longDesc}</p>
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
            <FaArrowUpRightDots className={styles.arrowIcon} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
