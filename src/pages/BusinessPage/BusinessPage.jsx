import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BusinessPage.module.css';
import SEO from '../../common/SEO';
import { useTheme } from '../../common/themeContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Icons
import { FaSearch, FaExternalLinkAlt, FaArrowLeft, FaGlobe, FaDesktop, FaCogs, FaShieldAlt, FaBullhorn, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { MdEmail, MdDarkMode, MdLightMode } from 'react-icons/md';

// Project images
import profileImg from '../../assets/mp2.jpg';
import indrafndn from '../../assets/indrafndn.png';
import hnltech from '../../assets/hnltech.png';
import hackademy from '../../assets/hackademy.png';
import epoch from '../../assets/epoch.png';
import gasdottips from '../../assets/gasdottips.png';
import democrazy from '../../assets/democrazy.png';
import chromagen from '../../assets/chromagen.png';
import initphase from '../../assets/initphase.png';

// Company logos
import stallionLogo from '../../assets/TSP.jpg';
import deepcytesLogo from '../../assets/deepcytes.jpg';
import noxalgoLogo from '../../assets/noxalgo.jpg';
import smowcodeLogo from '../../assets/smowcode.jpeg';

const roles = [
  "Software Developer",
  "Security Analyst",
  "Helping Businesses Win Online"
];

function BusinessPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const rotationRef = useRef(0);
  const speedRef = useRef(1.5);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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

  useEffect(() => {
    if (theme === 'light') toggleTheme();
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, [theme, toggleTheme]);

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('business-contact').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWork = (e) => {
    e.preventDefault();
    document.getElementById('business-work').scrollIntoView({ behavior: 'smooth' });
  };

  // ── Services (in requested order) ────────────────────────────
  const services = [
    {
      title: "Landing Pages",
      desc: "High-converting pages built for product launches, campaigns, or service offerings. Designed to turn visitors into paying customers.",
      icon: <FaDesktop />
    },
    {
      title: "Business Websites",
      desc: "Professional websites that make your business look credible and trustworthy to every customer who finds you online.",
      icon: <FaGlobe />
    },
    {
      title: "Agentic AI Solutions",
      desc: "Custom AI agents and autonomous workflows that handle repetitive tasks, data processing, and decision-making for your business in real-time.",
      icon: <FaCogs />
    },
    {
      title: "SEO Setups",
      desc: "Get found on Google without spending on ads. Your website set up to rank for local searches in your city from day one.",
      icon: <FaSearch />
    },
    {
      title: "Digital Marketing",
      desc: "Get your business in front of the right people through email campaigns, social assets, and ad-ready web content.",
      icon: <FaBullhorn />
    },
    {
      title: "Security Consulting",
      desc: "Find vulnerabilities in your web platforms before someone else does. Keep your business, your data, and your customers safe.",
      icon: <FaShieldAlt />
    }
  ];

  // ── Projects (in requested order) ────────────────────────────
  const highlightedWork = [
    {
      name: "Indradhanu Foundation",
      image: indrafndn,
      desc: "Complete NGO website setup with search visibility, lead capture forms, and reliable digital presence. Delivered fully end-to-end for real impact.",
      live: "https://www.indradhanufoundation.in/"
    },
    {
      name: "HNLTech",
      image: hnltech,
      desc: "A modern business landing page designed to build trust, showcase services clearly, and convert visitors into real clients effectively.",
      live: "https://hnltech.netlify.app/"
    },
    {
      name: "Chromagen",
      image: chromagen,
      desc: "A smart visual tool that helps SaaS businesses quickly generate branding colors, design assets, and maintain a consistent digital identity.",
      live: "https://www.chromagen.xyz/"
    },
    {
      name: "InitPhase",
      image: initphase,
      desc: "Built a scalable digital platform from the ground up for software developers to manage operations, workflows, and growth with a structured system.",
      live: "https://init-phase.vercel.app/"
    },
    {
      name: "Hackademy",
      image: hackademy,
      desc: "An interactive learning platform that helps people learn about general digial security and online scams using simulations and gamification.",
      live: "https://tryhackademy.vercel.app/"
    },
    {
      name: "Epoch",
      image: epoch,
      desc: "A simple daily habit tracking tool that helps users stay consistent, monitor progress, and build routines without unnecessary complexity.",
      live: "https://epoch-daily.vercel.app/"
    },
    {
      name: "GAS.TIPS",
      image: gasdottips,
      desc: "A direct payment platform enabling creators and businesses to receive instant digital tips without relying on third party intermediaries.",
      live: "https://gasdottips.vercel.app/"
    },
    {
      name: "Democrazy",
      image: democrazy,
      desc: "A secure digital voting platform ensuring transparency, trust, and tamper proof decision making for communities and organizational use cases.",
      live: "https://votewithdemocrazy.vercel.app/"
    }
  ];

  // ── Companies ─────────────────────────────────────────────────
  const companies = [
    {
      name: "The Stallion Project",
      role: "Software Developer",
      url: "https://www.instagram.com/thestallionproject/",
      logo: stallionLogo,
      initials: "SP"
    },
    {
      name: "Deepcytes Cyber Labs",
      role: "Security Analyst",
      location: "UK",
      url: "https://deepcytes.io",
      logo: deepcytesLogo,
      initials: "DC"
    },
    {
      name: "Noxalgo LLP",
      role: "Software Developer",
      url: "https://noxalgo.com",
      logo: noxalgoLogo,
      initials: "NA"
    },
    {
      name: "Smowcode Pvt Ltd",
      role: "Software Developer",
      url: "https://smowcode.com",
      logo: smowcodeLogo,
      initials: "SC"
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <SEO
        title="Freelance Web Developer | Websites & Digital Solutions"
        description="Ritesh Jha - Freelance Web Developer offering business websites, redesigns, SEO, and custom web applications for growing businesses."
        canonical="https://ritesh-jha.vercel.app/for-business"
      />

      {/* ── Hero ── fills 100dvh so nothing below is visible on load */}
      <section className={styles.hero}>
        <div className={styles.themeToggleContainer}>
          <button onClick={toggleTheme} className={styles.themeToggleBtn} aria-label="Toggle Theme" title="Toggle Theme">
            <div ref={toggleRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {theme === 'light' ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
            </div>
          </button>
        </div>

        <div className={styles.heroInner}>
          <div className={styles.profileSection}>
            <img src={profileImg} alt="Ritesh Jha" className={styles.profileImg} />
            <h2 className={styles.name}>Ritesh Jha</h2>
            <span className={styles.location}>Mumbai, India</span>
          </div>

          <div className={styles.trustIndicator}>
            <span key={roleIndex} className={styles.roleAnimated}>
              {roles[roleIndex]}
            </span>
          </div>

          <h1 className={styles.title}>Your Business Deserves a Website THAT BRINGS YOU REAL CUSTOMERS</h1>
          <p className={styles.subtext}>
            I build fast, professional websites for local and growing businesses that help you get more inquiries, more calls, and more sales not just traffic.
          </p>

          <div className={styles.ctaContainer}>
            <a href="#contact" onClick={scrollToContact} className={styles.btnPrimary}>Get in Touch</a>
            <a href="#work" onClick={scrollToWork} className={styles.btnSecondary}>See My Work</a>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className={styles.section} data-aos="fade-up">
        <h2 className={styles.sectionTitle}>What I Can Help Your Business With</h2>
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div 
              key={index} 
              className={styles.serviceCard} 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className={styles.serviceCardHeader}>
                <div className={styles.serviceIconContainer}>{service.icon}</div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
              </div>
              <p className={styles.serviceDesc}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Selected Work ── */}
      <section id="business-work" className={styles.section} data-aos="fade-up">
        <h2 className={styles.sectionTitle}>Selected Work</h2>
        <div className={styles.projectsGrid}>
          {highlightedWork.map((project, index) => (
            <div 
              key={index} 
              className={styles.projectCard} 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              {/* Image container: always shows the full image */}
              <div className={styles.projectImgWrap}>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className={styles.projectImg}
                  />
                ) : (
                  <div style={{ opacity: 0.1, fontSize: '10px', fontFamily: 'Roboto Mono' }}>{project.name}</div>
                )}
              </div>
              {/* Title row */}
              <div className={styles.projectTopRow}>
                <h3 className={styles.projectName}>{project.name}</h3>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.liveLink}
                    aria-label={`View live project for ${project.name}`}
                    title="View Live"
                  >
                    <FaExternalLinkAlt size={12} />
                  </a>
                )}
              </div>
              {/* Description */}
              <div className={styles.projectContent}>
                <p className={styles.projectDesc}>{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About & Contact ── */}
      <section id="business-contact" className={styles.section} data-aos="fade-up">
        <h2 className={styles.sectionTitle}>About</h2>
        <div className={styles.aboutContactContainer}>

          {/* About column — mirrors contactContent structure exactly */}
          <div className={styles.aboutContent}>
            <div className={styles.aboutSticky}>
              <h3>Full Stack Developer & Security Analyst</h3>
              <p>
                Based in Mumbai with a B.Tech in Information Technology. I build tested, production-ready products for businesses across India and the UK.
              </p>

              {/* Credentials bar — mirrors contactHighlights */}
              <div className={styles.aboutHighlights}>
                <div className={styles.aboutHighlightItem}>
                  <span className={styles.aboutHighlightNumber}>B.Tech</span>
                  <span className={styles.aboutHighlightLabel}>Information Technology</span>
                </div>
                <div className={styles.aboutHighlightItem}>
                  <span className={styles.aboutHighlightNumber}>3+</span>
                  <span className={styles.aboutHighlightLabel}>Years Experience</span>
                </div>
                <div className={styles.aboutHighlightItem}>
                  <span className={styles.aboutHighlightNumber}>India & UK</span>
                  <span className={styles.aboutHighlightLabel}>Clients Served</span>
                </div>
              </div>

              {/* Company grid — mirrors contactActions */}
              <div className={styles.companiesGrid}>
                {companies.map((company, index) => (
                  <a
                    key={index}
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.companyCard}
                    title={`${company.name} — ${company.role}`}
                  >
                    <div className={styles.companyLogo}>
                      {company.logo ? (
                        <img src={company.logo} alt={company.name} className={styles.companyLogoImg} />
                      ) : (
                        <span className={styles.companyInitials}>{company.initials}</span>
                      )}
                    </div>
                    <div className={styles.companyInfo}>
                      <span className={styles.companyName}>
                        {company.name}{company.location ? `, ${company.location}` : ''}
                      </span>
                      <span className={styles.companyRole}>{company.role}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact column */}
          <div className={styles.contactContent}>
            <div className={styles.contactSticky}>
              <h3>Ready to grow your business online?</h3>
              <p>
                Whether you are starting fresh or your current website is not bringing in customers, let&apos;s talk. Most projects are scoped, quoted, and started within a week.
              </p>

              <div className={styles.contactHighlights}>
                <div className={styles.contactHighlightItem}>
                  <span className={styles.contactHighlightNumber}>15+</span>
                  <span className={styles.contactHighlightLabel}>Projects Shipped</span>
                </div>
                <div className={styles.contactHighlightItem}>
                  <span className={styles.contactHighlightNumber}>6</span>
                  <span className={styles.contactHighlightLabel}>Companies Worked With</span>
                </div>
                <div className={styles.contactHighlightItem}>
                  <span className={styles.contactHighlightNumber}>Direct</span>
                  <span className={styles.contactHighlightLabel}>Access to Dev</span>
                </div>
              </div>

              <div className={styles.contactActions}>
                <a href="mailto:ritesh.exe@proton.me" className={styles.contactLink}>
                  <MdEmail size={16} />
                  <span>ritesh.exe@proton.me</span>
                </a>
                <a href="tel:+918433517682" className={styles.contactLink}>
                  <FaPhone size={14} />
                  <span>+91 84335 17682</span>
                </a>
                <a
                  href="https://wa.me/918433517682?text=Hi%20Ritesh%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappBtn}
                >
                  <FaWhatsapp size={17} />
                  WhatsApp Me
                </a>
                <a
                  href="mailto:ritesh.exe@proton.me?subject=Business Inquiry"
                  className={styles.emailCta}
                >
                  Email Me Now
                </a>
              </div>
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