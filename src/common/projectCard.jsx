import React from 'react'
import styles from './projectCard.module.css' // New CSS file for styling

function ProjectCard({ src, h3, shortDesc, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={src} alt={h3} className={styles.image} />
      <h3>{h3}</h3>
      <p>{shortDesc}</p> {/* Show only short description here */}
    </div>
  )
}


export default ProjectCard
