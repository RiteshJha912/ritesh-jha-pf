import React, { useEffect, useState } from 'react'
import styles from './projectModal.module.css'
import { FaGithub } from 'react-icons/fa'
import { FaArrowUpRightDots } from 'react-icons/fa6'

function ProjectModal({ isOpen, onClose, project }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      })
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

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
