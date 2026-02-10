import React, { useRef, useEffect } from 'react';
import styles from './ProjectsTeaser.module.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

function ProjectsTeaser() {
  const navigate = useNavigate();
  const cardStackRef = useRef(null);
  
  // Physics state
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  const handleNavigate = () => {
    navigate('/projects');
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    // LERP loop for smooth physics without jitter
    const animate = () => {
      if (!cardStackRef.current) return;

      // Skip animation on mobile to keep it static and save resources
      if (window.innerWidth <= 768) {
        cardStackRef.current.style.transform = ''; // Clear inline style 
        rafId.current = requestAnimationFrame(animate);
        return;
      }

      // Linear Interpolation: Move current towards target
      // Use smoother easing (0.05) when resetting to center, snappier (0.1) when tracking mouse
      const isResetting = target.current.x === 0 && target.current.y === 0;
      const easing = isResetting ? 0.05 : 0.1; 
      
      const diffX = target.current.x - current.current.x;
      const diffY = target.current.y - current.current.y;

      // Stop animation if we're close enough (optimization)
      if (Math.abs(diffX) < 0.01 && Math.abs(diffY) < 0.01) {
        current.current = { ...target.current }; // Snap to finish
      } else {
        current.current.x += diffX * easing;
        current.current.y += diffY * easing;
      }

      // Apply transform
      const x = current.current.x.toFixed(2);
      const y = current.current.y.toFixed(2);
      
      cardStackRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
      
      rafId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (window.innerWidth <= 768) return; 

    // Calculate normalized position (-1 to 1)
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2); 
    const y = (e.clientY - top - height / 2) / (height / 2);
    
    // Max tilt degrees
    const maxTilt = 12;
    target.current = { x: x * maxTilt, y: y * maxTilt };
  };

  const handleMouseLeave = () => {
    target.current = { x: 0, y: 0 };
  };

  return (
    <section id="projects" className={styles.container}>
      <h2 className="sectionTitle">Projects</h2>
      
      <div 
        className={styles.teaserContent} 
        onClick={handleNavigate}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className={styles.cardStack}
          ref={cardStackRef}
        >
          {/* Decorative Back Cards with Project Names */}
          <div className={`${styles.card} ${styles.card3}`}>
            <span>Taskify</span>
          </div>
          <div className={`${styles.card} ${styles.card2}`}>
            <span>Koshkeeper</span>
          </div>
          <div className={`${styles.card} ${styles.card4}`}>
             <span>HNLTech</span>
          </div>
          
          {/* Main Front Card */}
          <div className={`${styles.card} ${styles.card1}`}>
            <div className={styles.cardContent}>
              <h3>Explore My Work</h3>
              <p>stuff that I have built, broken, fixed & shipped  all in one place.</p>
              <button className={styles.viewBtn}>
                View All Projects <FaArrowRight />
              </button>
            </div>
            
            <div className={styles.overlay}></div>
          </div>
        </div>
        
      </div>
    </section>
  );
}

export default ProjectsTeaser;
