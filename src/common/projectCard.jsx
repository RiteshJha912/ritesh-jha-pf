import React from 'react';

function ProjectCard({ src, link, h3, p }) {
  return (
    <a href={link} target='_blank' data-aos='fade-up'>
      <img className='hover' src={src} alt={`${h3} logo`} data-aos='fade-up' />
      <h3>{h3}</h3>
      <p>{p}</p>
    </a>
  )
}

export default ProjectCard;