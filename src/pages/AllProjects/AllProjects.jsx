import React, { useEffect, useState, useMemo } from 'react';
import styles from './AllProjects.module.css';
import hnltech from '../../assets/hnltech.png';
import koshkeeper from '../../assets/koshkeeper.png';
import taskifyv2 from '../../assets/taskifyv2.png';
import devflipper from '../../assets/devflipper.png';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AllProjects() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Migration of Data from sections/Projects/projects.jsx
  const projects = [
    {
      src: null, // Add image when available
      h3: 'Indradhanu Foundation',
      shortDesc: 'NGO Website & Digital Infrastructure',
      longDesc:
        'Delivered a complete end-to-end freelance project: React-Vite website with SEO optimization, Google Apps Script integration for serverless form handling, custom domain setup, organizational emails, and achieved #1 Google ranking for the foundation\'s name.',
      github: null,
      live: 'https://www.indradhanufoundation.in/',
      tags: {
        stack: ['React', 'Vite', 'Google Apps Script', 'Google Sheets API', 'Framer Motion', 'AOS', 'React Router'],
        domain: ['Freelance', 'Full-Stack', 'SEO', 'Web Development', 'DevOps', 'Email Setup']
      }
    },
    {
      src: null,
      h3: 'Democrazy',
      shortDesc: 'Decentralized Voting dApp',
      longDesc:
        'Created a censorship-resistant governance platform on Ethereum Sepolia with Solidity smart contracts. Implements atomic voting transactions, wallet integration via ethers.js v6, and a Node.js/MongoDB caching layer to optimize RPC latency for real-time state updates.',
      github: 'https://github.com/RiteshJha912/democrazy',
      live: 'https://votewithdemocrazy.vercel.app/',
      tags: {
        stack: ['Solidity', 'Hardhat', 'React', 'Ethers.js', 'Node.js', 'Express', 'MongoDB', 'Web3'],
        domain: ['Blockchain', 'DApp', 'Smart Contracts', 'Full-Stack', 'Ethereum', 'Governance']
      }
    },
    {
      src: null,
      h3: 'GAS.TIPS - Web3 Tip Jar',
      shortDesc: 'Decentralized Tipping Platform',
      longDesc:
        'Developed a Web3 tip jar enabling direct crypto payments to content creators. Features wallet connection, smart contract integration for secure transactions, and a clean interface for seamless tipping experiences on Ethereum networks.',
      github: 'https://github.com/RiteshJha912/gas.tips',
      live: 'https://gas-tips.vercel.app/',
      tags: {
        stack: ['React', 'Ethers.js', 'Solidity', 'Web3', 'Smart Contracts', 'Tailwind CSS'],
        domain: ['Blockchain', 'DApp', 'Payments', 'Web3', 'Cryptocurrency', 'Frontend']
      }
    },
    {
      src: null,
      h3: 'Epoch',
      shortDesc: 'Habit Tracker with GitHub-Style Contributions',
      longDesc:
        'Build habits that actually stick: a minimal, open-source habit tracker with a GitHub-inspired contributions graph. Features Firebase authentication, real-time habit tracking, visual progress monitoring, and shareable milestone certificates for social media. Includes push notifications and community engagement through achievement sharing.',
      github: 'https://github.com/RiteshJha912/epoch',
      live: 'https://epoch-daily.vercel.app/',
      tags: {
        stack: ['Next.js', 'React', 'Firebase', 'Firestore', 'Google Auth', 'Vanilla CSS'],
        domain: ['Full-Stack', 'Productivity', 'Habit Tracking', 'Gamification', 'Social Sharing', 'Frontend']
      }
    },
    {
      src: null,
      h3: 'Chromagen',
      shortDesc: 'AI-Powered Color Palette Generator',
      longDesc:
        'Intelligent color palette generator for designers and developers. Generate palettes from text prompts using GAN, extract colors from images with Pylette, test WCAG AA/AAA compliance, simulate color blindness, preview on live UI mockups, and export as CSS/JSON. Built by Team BootWinXP at Bit N Build Hackathon. Features browser extension for extracting palettes from any webpage.',
      github: 'https://github.com/Om-Thanage/bootWinXP_Internal-Round_70',
      live: 'https://www.chromagen.xyz/',
      tags: {
        stack: ['React', 'Vite', 'TailwindCSS', 'FastAPI', 'Python', 'GAN', 'Pylette', 'GenAI'],
        domain: ['Full-Stack', 'AI/ML', 'Accessibility', 'Design Tools', 'WCAG', 'Hackathon', 'Frontend']
      }
    },
    {
      src: null,
      h3: 'Hackademy',
      shortDesc: 'Gamified Cybersecurity Education Platform',
      longDesc:
        'Comprehensive cybersecurity education platform that transforms learning into an engaging game experience. Learn about real-world cyber threats through interactive quizzes on digital arrest scams, UPI payment fraud, e-KYC SIM swap, fake job scams, and WhatsApp stock scams. Features global leaderboard, real-time scoring, progress tracking, detailed scam guides, and instant feedback with no registration required.',
      github: 'https://github.com/RiteshJha912/hackademy-final',
      live: 'https://hackademy-in.onrender.com/',
      tags: {
        stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js', 'Recharts', 'Axios', 'React Router'],
        domain: ['Education', 'E-Learning', 'Cybersecurity', 'Gamification', 'Web Development', 'Full-Stack']
      }
    },
    {
      src: taskifyv2,
      h3: 'Taskify-V2',
      shortDesc: 'Full-Stack Task Manager',
      longDesc:
        'Engineered a robust task management system with user authentication, persistent MongoDB storage, and real-time updates. Implements CRUD operations, task categorization, priority levels, and deadline tracking through a responsive MERN stack architecture.',
      github: 'https://github.com/RiteshJha912/TaskifyV2-UserSpecific',
      live: 'https://taskifyv2-final.onrender.com/',
      tags: {
        stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST API'],
        domain: ['Full-Stack', 'Productivity', 'CRUD', 'Authentication', 'Task Management', 'Web Development']
      }
    },
    {
      src: koshkeeper,
      h3: 'कोष-Keeper',
      shortDesc: 'Firebase Expense Tracker',
      longDesc:
        'Developed a personal finance tracker with Google OAuth authentication and Firebase Realtime Database. Categorizes transactions, visualizes spending patterns, stores data permanently in the cloud, and provides insights into financial habits through intuitive dashboards.',
      github: 'https://github.com/RiteshJha912/KoshKeeper',
      live: 'https://expense-tracker99.web.app/',
      tags: {
        stack: ['React', 'Firebase', 'Google Auth', 'Firestore', 'Chart.js'],
        domain: ['Full-Stack', 'Finance', 'Authentication', 'Data Visualization', 'Cloud', 'Frontend']
      }
    },
    {
      src: null,
      h3: 'PaperOps.ai',
      shortDesc: 'AI Research Assistant',
      longDesc:
        'Built an intelligent research agent that automates academic paper discovery, summarization, and analysis. Leverages LLM capabilities for deep research synthesis, citation extraction, and generates comprehensive literature reviews from multiple sources.',
      github: 'https://github.com/RiteshJha912/PaperOps.ai',
      live: null,
      tags: {
        stack: ['Python', 'LangChain', 'OpenAI API', 'Vector Databases', 'AI/ML'],
        domain: ['Agentic AI', 'Research', 'NLP', 'Automation', 'Machine Learning']
      }
    },
    {
      src: null,
      h3: 'CofferCrypt',
      shortDesc: 'Password-Based File Encryption Tool',
      longDesc:
        'A simple and effective tool for encrypting and decrypting text files with a password using the Caesar cipher technique. Users can set a password that determines the encryption shift, making it secure and customizable. Demonstrates basic file handling and encryption techniques in C++.',
      github: 'https://github.com/RiteshJha912/CofferCrypt',
      live: null,
      tags: {
        stack: ['C++', 'File I/O', 'Cryptography'],
        domain: ['Security', 'Encryption', 'Caesar Cipher', 'CLI Tool', 'Desktop App']
      }
    },
    {
      src: devflipper,
      h3: 'DevFlipper',
      shortDesc: '3D Portfolio Showcase',
      longDesc:
        'Crafted an immersive 3D portfolio experience using Three.js and React Three Fiber. Projects are displayed in an interactive flipbook format with realistic physics, smooth page transitions, and WebGL rendering for a memorable browsing experience.',
      github: 'https://github.com/RiteshJha912/DevFlipper',
      live: 'https://dev-flipper.vercel.app/',
      tags: {
        stack: ['React', 'Three.js', 'React Three Fiber', 'Tailwind CSS', 'Vite', 'WebGL'],
        domain: ['Game Type', '3D Graphics', 'Interactive Design', 'Portfolio', 'Frontend']
      }
    },
    {
      src: null,
      h3: 'Slinket.io',
      shortDesc: 'Modern Snake Game',
      longDesc:
        'Recreated the classic Snake game with modern web technologies. Features responsive controls for desktop and mobile, dynamic difficulty scaling, pause/resume functionality, and polished UI with smooth animations for an addictive gaming experience.',
      github: 'https://github.com/RiteshJha912/snake-game',
      live: 'https://snake-game-lemon-nu.vercel.app/',
      tags: {
        stack: ['React', 'Vite', 'JavaScript', 'CSS', 'Touch Events'],
        domain: ['Game Type', 'Gaming', 'Interactive', 'Mobile-First', 'Frontend']
      }
    },
    {
      src: hnltech,
      h3: 'HNLTech',
      shortDesc: 'Modern Agency Landing Page Concept',
      longDesc:
        'Designed and developed a hypothetical tech agency landing page to explore advanced frontend techniques. Leverages Next.js 14 and React Three Fiber to demonstrate how modern animations and 3D elements can elevate corporate digital identities.',
      github: 'https://github.com/RiteshJha912/hnltech',
      live: 'https://hnltech.netlify.app/',
      tags: {
        stack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'React Three Fiber', 'TypeScript'],
        domain: ['Frontend', 'Concept Design', 'UI/UX', '3D Graphics', 'Animation']
      }
    },
  ];

  const categories = ['All', 'Freelance', 'Full-Stack', 'Agentic AI', 'Security', 'Blockchain', 'Game Type', 'Frontend'];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Check both stack and domain arrays for the active category
      const allTags = [...(project.tags.stack || []), ...(project.tags.domain || [])];
      
      const matchesCategory = activeCategory === 'All' 
        || allTags.includes(activeCategory);
      
      const matchesSearch = project.h3.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            project.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, projects]);

  return (
    <section className={styles.pageContainer}>
      <div className={`${styles.header} ${styles.animateIn}`}>
        <button onClick={() => navigate('/')} className={styles.backBtn}>
          <FaArrowLeft /> Back to Home
        </button>
        <h1>All Projects 📂</h1>
        <p className={styles.subtitle}>
          A curated list of my technical projects, experiments, and production applications.
        </p>
      </div>

      <div className={`${styles.controls} ${styles.animateIn}`}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search projects by name or technology..." 
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

      <div className={`${styles.grid} ${styles.animateIn}`}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <div 
              key={index} 
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                 {/* {project.src ? (
                    <img src={project.src} alt={project.h3} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                 ) : (
                    <div className={styles.imagePlaceholder}></div>
                 )} */}
                 <div className={styles.imagePlaceholder}></div>
                 <div className={styles.cardHeader}>
                   <h3>{project.h3}</h3>
                   <div className={styles.links}>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" title="View Code">
                          <FaGithub />
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noreferrer" title="Live Demo">
                          <FaExternalLinkAlt />
                        </a>
                      )}
                   </div>
                 </div>
              </div>
              
              <div className={styles.content}>
                <p className={styles.shortDesc}>{project.shortDesc}</p>
                <p className={styles.longDesc}>{project.longDesc}</p>
                
                {/* Updated Tags Section */}
                <div className={styles.tagsContainer}>
                  <div className={styles.tagGroup}>
                    {/* <span className={styles.tagLabel}>Stack</span> */}
                    <div className={styles.tags}>
                      {project.tags.stack.map((tag, i) => (
                        <span key={i} className={styles.stackTag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  {project.tags.domain && project.tags.domain.length > 0 && (
                    <div className={styles.tagGroup}>
                      {/* <span className={styles.tagLabel}>Domain</span> */}
                      <div className={styles.tags}>
                        {project.tags.domain.map((tag, i) => (
                          <span key={i} className={styles.domainTag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}
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