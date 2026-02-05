import React, { useEffect, useState, useMemo } from 'react';
import styles from './AllProjects.module.css';
import hnltech from '../../assets/hnltech.png';
import koshkeeper from '../../assets/koshkeeper.png';
import taskifyv2 from '../../assets/taskifyv2.png';
import devflipper from '../../assets/devflipper.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AllProjects() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
    });
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    {
      src: hnltech,
      h3: 'HNLTech',
      shortDesc: 'Software Company Landing Page',
      longDesc:
        'A professional website built for HNLTech Pvt. Ltd., crafted with Next.js & React.js. It enhances their digital presence with smooth animations, theme switching & 3D elements.',
      github: 'https://github.com/RiteshJha912/hnltech',
      live: 'https://hnltech.in/',
      tags: ['Next.js', 'React', 'Tailwind', 'Framer Motion'],
      category: 'Next.js'
    },
    {
      src: koshkeeper,
      h3: 'Koshkeeper',
      shortDesc: 'Expense Tracker',
      longDesc:
        'A smart expense tracker using React & Firebase. It enables secure Google login, categorizes transactions & stores financial data permanently.',
      github: 'https://github.com/RiteshJha912/KoshKeeper',
      live: 'https://expense-tracker99.web.app/',
      tags: ['React', 'Firebase', 'Auth', 'Chart.js'],
      category: 'React'
    },
    {
      src: taskifyv2,
      h3: 'Taskify-V2',
      shortDesc: 'To-do list website',
      longDesc:
        'A full-stack to-do app with React, Node.js, Express & MongoDB. It provides real-time updates, persistent storage & a user-friendly task management experience.',
      github: 'https://github.com/RiteshJha912/TaskifyV2-UserSpecific',
      live: 'https://taskifyv2-final.onrender.com/',
      tags: ['MERN', 'Redux', 'JWT', 'Full Stack'],
      category: 'Full Stack'
    },
    {
      src: devflipper, 
      h3: 'Dev-Flipper',
      shortDesc: '3D Projects Showcase',
      longDesc:
        'A 3D project showcase built with Three.js & React Three Fiber. It offers an interactive, visually appealing way to display projects.',
      github: 'https://github.com/RiteshJha912/DevFlipper',
      live: 'https://dev-flipper.vercel.app/',
      tags: ['Three.js', 'R3F', 'React'],
      category: 'Three.js'
    },
  ];

  const categories = ['All', 'React', 'Next.js', 'Full Stack', 'Three.js'];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = activeCategory === 'All' || project.tags.includes(activeCategory) || project.category === activeCategory;
      const matchesSearch = project.h3.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            project.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, projects]);

  return (
    <section className={styles.pageContainer}>
      <div className={styles.header}>
        <button onClick={() => navigate('/')} className={styles.backBtn}>
          <FaArrowLeft /> Back to Home
        </button>
        <h1 data-aos="fade-down">All Projects 📂</h1>
        <p className={styles.subtitle} data-aos="fade-down" data-aos-delay="100">
          A curated list of my technical projects, experiments, and production applications.
        </p>
      </div>

      <div className={styles.controls} data-aos="fade-down" data-aos-delay="200">
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterTabs}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.filterTab} ${activeCategory === category ? styles.activeTab : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <div 
              key={index} 
              className={styles.card}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={styles.imageWrapper}>
                 <div className={styles.imagePlaceholder}></div>
                 <div className={styles.cardHeader}>
                   <h3>{project.h3}</h3>
                   <div className={styles.links}>
                      <a href={project.github} target="_blank" rel="noreferrer" title="View Code">
                        <FaGithub />
                      </a>
                      <a href={project.live} target="_blank" rel="noreferrer" title="Live Demo">
                        <FaExternalLinkAlt />
                      </a>
                   </div>
                 </div>
              </div>
              
              <div className={styles.content}>
                <p className={styles.shortDesc}>{project.shortDesc}</p>
                <p className={styles.longDesc}>{project.longDesc}</p>
                
                <div className={styles.tags}>
                  {project.tags && project.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            <p>No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default AllProjects;
