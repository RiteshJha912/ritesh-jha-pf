import React, { useEffect, useState } from 'react'
import styles from './projectModal.module.css'
import { FaGithub } from 'react-icons/fa'
import { FaArrowUpRightDots } from 'react-icons/fa6'

function ProjectModal({ isOpen, onClose, project }) {
  // manages animation state, ensuring smooth fade-in and fade-out effects
  const [isAnimating, setIsAnimating] = useState(false)

  // controls whether the modal should be rendered in the DOM to prevent unnecessary re-renders
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true) // ensures modal appears in the DOM when opened
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true) // triggers animation after ensuring the component is in the DOM
        })
      })
    } else {
      setIsAnimating(false)
      // delays unmounting the modal to allow the closing animation to complete
      const timer = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(timer) // cleanup function to avoid memory leaks
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden' // prevents background scrolling when modal is open
    }
    return () => {
      document.body.style.overflow = 'unset' // does exactly the opposite of last comment
    }
  }, [isOpen])

  // prevents rendering if the modal should not be visible or project data is missing
  if (!shouldRender || !project) return null

  return (
    <div
      className={`${styles.overlay} ${
        isAnimating ? styles.overlayVisible : ''
      }`}
      onClick={onClose} 
    >
      <div
        className={`${styles.modal} ${isAnimating ? styles.modalOpen : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalContent}>
          <div className={styles.closeButton} onClick={onClose}>
            &times;
          </div>

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
    </div>
  )
}

export default ProjectModal
