import React from 'react'
import styles from './projectCard.module.css'

function ProjectCard({ src, h3, shortDesc, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      {/* renders the project's image, ensuring accessibility by using the project title as alt text */}
      <img src={src} alt={h3} className={styles.image} />

      {/* Just kept these alive alive eventhough they are not visible because it helps in generating some margin below  */}
      <h3>{h3}</h3>
      <p>{shortDesc}</p>
    </div>
  )
}

export default ProjectCard
