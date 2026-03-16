import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BusinessPage.module.css';
import SEO from '../../common/SEO';
import { useTheme } from '../../common/themeContext';

// Icons
import { FaCode, FaRocket, FaSearch, FaComments, FaHandshake, FaExternalLinkAlt, FaArrowLeft, FaGlobe, FaPaintBrush, FaDesktop, FaCogs, FaTachometerAlt } from 'react-icons/fa';
import { MdEmail, MdDarkMode, MdLightMode } from 'react-icons/md';

// Images
import profileImg from '../../assets/mp2.jpg';
import indrafndn from '../../assets/indrafndn.png';
import hnltech from '../../assets/hnltech.png';
import hackademy from '../../assets/hackademy.png';
import epoch from '../../assets/epoch.png';
import gasdottips from '../../assets/gasdottips.png';
import democrazy from '../../assets/democrazy.png';
import chromagen from '../../assets/chromagen.png';

function BusinessPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const rotationRef = useRef(0);
  const speedRef = useRef(1.5);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      const targetSpeed = scrolled ? 0.1 : 0.5; 
      speedRef.current += (targetSpeed - speedRef.current) * 0.05;
      rotationRef.current += speedRef.current;
      if (toggleRef.current) {
        toggleRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrolled]);

  // Enforce dark mode on page load
  useEffect(() => {
    if (theme === 'light') {
      toggleTheme();
    }
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('business-contact').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWork = (e) => {
    e.preventDefault();
    document.getElementById('business-work').scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      title: "Business Websites",
      desc: "Modern, fast and mobile-friendly websites designed to represent your company professionally online.",
      icon: <FaGlobe />
    },
    {
      title: "Website Redesign",
      desc: "Upgrade outdated or slow websites with modern UI designs and significantly better performance.",
      icon: <FaPaintBrush />
    },
    {
      title: "SEO Setup",
      desc: "Optimize your website's structure so your business can consistently appear on top Google search results.",
      icon: <FaSearch />
    },
    {
      title: "Landing Pages",
      desc: "High-conversion pages specifically built for your marketing campaigns or product launches.",
      icon: <FaDesktop />
    },
    {
      title: "Custom Web Applications",
      desc: "Tailor-made internal tools, dashboards, or tracking systems designed around your unique business needs.",
      icon: <FaCogs />
    },
    {
      title: "Performance Optimization",
      desc: "Auditing and improving the loading speed and reliability of your existing websites or applications.",
      icon: <FaTachometerAlt />
    }
  ];

  const highlightedWork = [
    {
      name: "InitPhase",
      image: null, 
      desc: "Architected a scalable digital platform built to handle heavy user traffic securely and efficiently for a growing startup initiative.",
      tech: "Next.js, Full Structure",
      result: "Provided a robust foundational architecture reducing future tech debt.",
      live: null
    },
    {
      name: "Indradhanu Foundation",
      image: indrafndn,
      desc: "Delivered a complete website for an NGO including SEO setup, domain configuration and form automation.",
      tech: "React, Google Apps Script, SEO",
      result: "Achieved #1 Google ranking for the organization name.",
      live: "https://www.indradhanufoundation.in/"
    },
    {
      name: "Hackademy",
      image: hackademy,
      desc: "Comprehensive web platform tracking user progress through complex data dashboards and engaging user experiences.",
      tech: "React, Node.js, MongoDB",
      result: "Scalable full-stack application capable of handling complex state management.",
      live: "https://tryhackademy.vercel.app/"
    },
    {
      name: "HNLTech",
      image: hnltech,
      desc: "Designed and developed a modern conceptual tech-agency landing page with engaging animations and a highly professional aesthetic.",
      tech: "Next.js, 3D Graphics, Animations",
      result: "Created a stunning corporate digital identity ready for high-ticket client conversion.",
      live: "https://hnltech.netlify.app/"
    },
    {
      name: "epoch",
      image: epoch,
      desc: "Developed a minimal and highly reliable productivity habit tracker application with seamless cloud data syncing.",
      tech: "Next.js, Firebase Auth",
      result: "Delivered a fast, engaging platform designed for daily user retention.",
      live: "https://epoch-daily.vercel.app/"
    },
    {
      name: "GAS.TIPS",
      image: gasdottips,
      desc: "A decentralized tipping platform enabling direct crypto payments to content creators securely.",
      tech: "React, Web3, Smart Contracts",
      result: "Seamless tipping experience on Ethereum networks.",
      live: "https://gasdottips.vercel.app/"
    },
    {
      name: "Democrazy",
      image: democrazy,
      desc: "Created a censorship-resistant governance platform focusing on immutable, transparent transactions.",
      tech: "Solidity, Web3, Full-Stack",
      result: "Atomic voting transactions with a high-speed caching layer.",
      live: "https://votewithdemocrazy.vercel.app/"
    },
    {
      name: "Chromagen",
      image: chromagen,
      desc: "Intelligent platform bridging modern web tooling with AI to produce high-end design utilities.",
      tech: "React, AI Tools, APIs",
      result: "Smart functionality packed into an easily digestible interface.",
      live: "https://www.chromagen.xyz/"
    }
  ];

  const whyMe = [
    {
      title: "Full-Stack Development",
      desc: "I build both the frontend interfaces that users see and the backend databases that run everything cleanly.",
      icon: <FaCode />
    },
    {
      title: "Performance Focused",
      desc: "A fast website retains customers. I optimize everything from code to images to ensure lightning-fast loading speeds.",
      icon: <FaRocket />
    },
    {
      title: "SEO Ready",
      desc: "Websites are structured from day one for discoverability, ensuring you rank higher organically.",
      icon: <FaSearch />
    },
    {
      title: "Direct Communication",
      desc: "No middlemen or confusing agency processes. You work and communicate directly with the developer.",
      icon: <FaComments />
    },
    {
      title: "Flexible For Startups",
      desc: "I understand the exact needs and constrained timelines of small businesses, entrepreneurs and fresh startups.",
      icon: <FaHandshake />
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <SEO 
        title="Freelance Web Developer | Websites & Digital Solutions"
        description="Ritesh Jha - Freelance Web Developer offering business websites, redesigns, SEO, and custom web applications for growing businesses."
        canonical="https://ritesh-jha.vercel.app/for-business"
      />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.themeToggleContainer}>
          <button onClick={toggleTheme} className={styles.themeToggleBtn} aria-label="Toggle Theme" title="Toggle Theme">
            <div ref={toggleRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {theme === 'light' ? <MdDarkMode size={22} /> : <MdLightMode size={22} />}
            </div>
          </button>
        </div>
        <div className={styles.profileSection}>
          <img src={profileImg} alt="Ritesh Jha" className={styles.profileImg} />
          <h2 className={styles.name}>Ritesh Jha</h2>
          <span className={styles.location}>Mumbai, India</span>
        </div>
        
        <div className={styles.trustIndicator}>
          Software Developer (Fullstack + Blockchain) | Security Analyst
        </div>

        <h1 className={styles.title}>Websites &amp; Digital Solutions for Growing Businesses</h1>
        <p className={styles.subtext}>
          I help businesses build fast, modern, and reliable websites that convert visitors into valuable clients.
        </p>

        <div className={styles.ctaContainer}>
          <a href="#work" onClick={scrollToWork} className={styles.btnPrimary}>View My Work</a>
          <a href="#contact" onClick={scrollToContact} className={styles.btnSecondary}>Contact Me</a>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What I Can Help Your Business With</h2>
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              <div className={styles.serviceIconContainer}>{service.icon}</div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDesc}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Work Section */}
      <section id="business-work" className={styles.section}>
        <h2 className={styles.sectionTitle}>Selected Work</h2>
        <div className={styles.projectsGrid}>
          {highlightedWork.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <div className={styles.projectTopRow}>
                <div className={styles.projectImgContainer}>
                  {project.image ? (
                    <img src={project.image} alt={project.name} className={styles.projectImg} />
                  ) : (
                    <div className={styles.projectImgPlaceholder}>
                        <span className={styles.placeholderText}>{project.name}</span>
                    </div>
                  )}
                </div>
                <div className={styles.projectHeaderInfo}>
                  <div className={styles.projectTitleRow}>
                    <h3 className={styles.projectName}>{project.name}</h3>
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.liveLink} aria-label={`View live project for ${project.name}`} title="View Live">
                        <FaExternalLinkAlt size={20} /> 
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.projectContent}>
                <p className={styles.projectDesc}>{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About & Contact Section */}
      <section id="business-contact" className={styles.section}>
        <div className={styles.aboutContactContainer}>
          <div className={styles.aboutContent}>
            <h3>About & Why Me?</h3>
            <p><strong>Hi, I'm Ritesh Jha.</strong></p>
            <p>I am a Full Stack Developer based in Mumbai with experience building full stack applications, web platforms, and security-aware systems.</p>
            
            <div className={styles.inlineWhyMe}>
              {whyMe.map((item, index) => (
                <div key={index} className={styles.inlineWhyMeItem}>
                  <div className={styles.inlineWhyMeIcon}>{item.icon}</div>
                  <div className={styles.inlineWhyMeText}>
                    <strong>{item.title}:</strong> {item.desc}
                  </div>
                </div>
              ))}
            </div>


          </div>

          <div className={styles.contactContent}>
            <h3>Ready to upgrade your business?</h3>
            <p>If you're a business owner looking to build or improve your website, feel free to reach out.</p>
            
            <div className={styles.contactActions}>
              <a href="mailto:ritesh.exe@proton.me" className={styles.emailLink}>
                <MdEmail size={24} /> ritesh.exe@proton.me
              </a>
              
              <a href="mailto:ritesh.exe@proton.me?subject=Freelance Project Inquiry" className={styles.btnPrimary} style={{ width: 'fit-content', marginTop: '10px' }}>
                Email Me
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.bottomNavContainer}>
        <button onClick={() => navigate('/')} className={styles.backBtnBottom}>
          <FaArrowLeft /> Back to Home
        </button>
      </div>

    </div>
  );
}

export default BusinessPage;
