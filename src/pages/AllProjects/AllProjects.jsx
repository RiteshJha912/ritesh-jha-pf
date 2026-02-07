import React, { useEffect, useState, useMemo } from 'react';
import styles from './AllProjects.module.css';
import indrafndn from '../../assets/indrafndn.png';
import democrazy from '../../assets/democrazy.png';
import paperops from '../../assets/paperops.png';
import epoch from '../../assets/epoch.png';
import chromagen from '../../assets/chromagen.png';
import gasdottips from '../../assets/gasdottips.png';
import debiased from '../../assets/debiased.jpg';
import hackademy from '../../assets/hackademy.png';
import hnltech from '../../assets/hnltech.png';
import taskifyv2 from '../../assets/taskifyv2.png';
import koshkeeper from '../../assets/koshkeeper.png';
import devflipper from '../../assets/devflipper.png';
import slinket from '../../assets/slinket.png';
import coffercrypt from '../../assets/coffercrypt.png';
import ethlogonew from '../../assets/ethlogonew.png';
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
      src: indrafndn,
      h3: 'Indradhanu Foundation',
      shortDesc: 'NGO Digital Infra',
      longDesc:
        'Delivered a complete end-to-end freelance project: React-Vite website with SEO optimization, Google Apps Script integration for serverless form handling, custom domain setup, organizational emails & achieved #1 Google ranking for the foundation\'s name.',
      github: null, // Proprietary
      live: 'https://www.indradhanufoundation.in/',
      tags: {
        stack: ['React', 'Vite', 'Google Apps Script', 'Google Sheets API', 'Framer Motion', 'AOS', 'React Router'],
        domain: ['Freelance', 'Full-Stack', 'SEO', 'Org Setup']
      }
    },
    {
      src: democrazy,
      h3: 'Democrazy',
      shortDesc: 'Web3 Voting dApp',
      longDesc:
        'Created a censorship resistant governance platform on Ethereum Sepolia with Solidity smart contracts. Implements atomic voting transactions, wallet integration via ethers.js v6 & a Node.js/MongoDB caching layer to optimize RPC latency for real time state updates.',
      github: 'https://github.com/RiteshJha912/democrazy',
      live: 'https://votewithdemocrazy.vercel.app/',
      tags: {
        stack: ['Solidity', 'Hardhat', 'React', 'Ethers.js', 'Node.js', 'Express', 'MongoDB', 'Web3'],
        domain: ['Blockchain', 'DApp', 'Smart Contracts', 'Full-Stack', 'Ethereum', 'Governance']
      }
    },
    {
      src: paperops,
      h3: 'PaperOps.ai',
      shortDesc: 'AI Research Assistant',
      longDesc:
        'Built an intelligent research agent that automates academic paper discovery, summarization & analysis. Leverages LLM capabilities for deep research synthesis, citation extraction & generates comprehensive literature reviews from multiple sources.',
      github: 'https://github.com/RiteshJha912/PaperOps.ai',
      live: null, // Add when available
      tags: {
        stack: ['Python', 'LangChain', 'groqAI API', 'Vector Databases', 'AI/ML'],
        domain: ['Agentic AI', 'Research', 'NLP', 'Automation', 'Reasoning+Action']
      }
    },
    {
      src: epoch,
      h3: 'epoch',
      shortDesc: 'Github style Habit Tracker',
      longDesc:
        'Build habits that actually stick: a minimal, open source habit tracker with a GitHub inspired contributions graph. Features Firebase authentication, real time habit tracking, visual progress monitoring & shareable milestone certificates for social media. Includes push notifications & community engagement through achievement sharing.',
      github: 'https://github.com/RiteshJha912/epoch',
      live: 'https://epoch-daily.vercel.app/',
      tags: {
        stack: ['Next.js', 'React', 'Firebase', 'Firestore', 'Google Auth', 'Vanilla CSS'],
        domain: ['Full-Stack', 'Productivity', 'Habit Tracking', 'Gamification', 'Social Sharing', 'Frontend']
      }
    },
    {
      src: chromagen,
      h3: 'Chromagen',
      shortDesc: 'AI Powered Color Palette Generator',
      longDesc:
        'Intelligent color palette generator for designers & developers. Generate palettes from text prompts using GAN, extract colors from images with Pylette, test WCAG AA/AAA compliance, simulate color blindness, preview on live UI mockups & export as CSS/JSON. Features browser extension for extracting palettes from any webpage. Built by Team BootWinXP at Bit N Build.',
      github: 'https://github.com/Om-Thanage/bootWinXP_Internal-Round_70',
      live: 'https://www.chromagen.xyz/',
      tags: {
        stack: ['React', 'Vite', 'TailwindCSS', 'FastAPI', 'Python', 'GAN', 'Pylette', 'GenAI'],
        domain: ['Full-Stack', 'AI/ML', 'Accessibility', 'Design Tools', 'WCAG', 'Hackathon', 'Frontend']
      }
    },
    {
      src: gasdottips,
      h3: 'GAS.TIPS',
      shortDesc: 'Decentralized Tipping Platform',
      longDesc:
        'Developed a Web3 tip jar enabling direct crypto payments to content creators. Features wallet connection, smart contract integration for secure transactions & a clean interface for seamless tipping experiences on Ethereum networks.',
      github: 'https://github.com/RiteshJha912/gas.tips',
      live: 'https://gasdottips.vercel.app/',
      tags: {
        stack: ['React', 'Ethers.js', 'Solidity', 'Web3', 'Smart Contracts',],
        domain: ['Blockchain', 'DApp', 'Payments', 'Web3', 'Cryptocurrency', 'Frontend']
      }
    },
    {
      src: debiased,
      h3: 'DeBiased',
      shortDesc: 'Survey Platform with ZK Proofs',
      longDesc:
        'A privacy first survey platform leveraging zero knowledge cryptography to eliminate opinion bias. Enables truthful feedback collection on sensitive topics by verifying respondent demographics via Self Protocol without revealing identity. Features automated rewards through Kadena EVM smart contracts & immutable, encrypted data storage on IPFS/Filecoin. Built by Team BootWinXP at ETHGlobal New Delhi.',
      github: 'https://github.com/ombhanushaliii/debiased',
      live: 'https://ethglobal.com/showcase/debiased-7h24b',
      tags: {
        stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Solidity', 'IPFS', 'Filecoin', 'Lighthouse', 'Self Protocol SDK', 'Kadena EVM'],
        domain: ['Blockchain', 'DApp', 'ZKP', 'Privacy', 'Data Collection', 'Smart Contracts', 'Decentralized Storage', 'Web3', 'Hackathon', 'Full-Stack']
      }
    },
    {
      src: hackademy,
      h3: 'Hackademy',
      shortDesc: 'Gamified Cybersecurity Education Platform',
      longDesc:
        'Comprehensive cybersecurity education platform that transforms learning into an engaging game experience. Learn about real world cyber threats through interactive quizzes on digital arrest scams, UPI payment fraud, e-KYC SIM swap, fake job scams & WhatsApp stock scams. Features global leaderboard, real time scoring, progress tracking, detailed scam guides & instant feedback with no registration required.',
      github: 'https://github.com/RiteshJha912/hackademy-final',
      live: 'https://hackademy-in.onrender.com/',
      tags: {
        stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js', 'Recharts', 'Axios', 'React Router'],
        domain: ['Education', 'E-Learning', 'Cybersecurity', 'Gamification', 'Full-Stack']
      }
    },
    {
      src: hnltech,
      h3: 'HNLTech',
      shortDesc: 'Modern Agency Landing Page Concept',
      longDesc:
        'Designed & developed a hypothetical tech agency landing page to explore advanced frontend techniques. Leverages Next.js 14 & React Three Fiber to demonstrate how modern animations & 3D elements can elevate corporate digital identities.',
      github: 'https://github.com/RiteshJha912/hnltech',
      live: 'https://hnltech.netlify.app/',
      tags: {
        stack: ['Next.js', 'React', 'Framer Motion', 'Three.js', 'React Three Fiber', 'TypeScript'],
        domain: ['Frontend', 'Concept Design', 'UI/UX', '3D Graphics', 'Animation']
      }
    },
    {
      src: taskifyv2,
      h3: 'Taskify-V2',
      shortDesc: 'Full Stack Task Manager',
      longDesc:
        'Engineered a robust task management system with user authentication, persistent MongoDB storage & real time updates. Implements CRUD operations, task categorization, priority levels & deadline tracking through a responsive MERN stack architecture.',
      github: 'https://github.com/RiteshJha912/TaskifyV2-UserSpecific',
      live: 'https://taskifyv2-final.onrender.com/',
      tags: {
        stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST API'],
        domain: ['Full-Stack', 'Productivity', 'CRUD', 'Authentication', 'Task Management']
      }
    },
    {
      src: koshkeeper,
      h3: 'कोष-Keeper',
      shortDesc: 'Firebase Expense Tracker',
      longDesc:
        'Developed a personal finance tracker with Google OAuth authentication & Firebase Realtime Database. Categorizes transactions, visualizes spending patterns, stores data permanently in the cloud & provides insights into financial habits through intuitive dashboards.',
      github: 'https://github.com/RiteshJha912/KoshKeeper',
      live: 'https://expense-tracker99.web.app/',
      tags: {
        stack: ['React', 'Firebase', 'Google Auth', 'Firestore', 'Chart.js'],
        domain: ['Full-Stack', 'Finance', 'Authentication', 'Data Visualization', 'Cloud', 'Frontend']
      }
    },
    {
      src: devflipper,
      h3: 'DevFlipper',
      shortDesc: '3D Portfolio Showcase',
      longDesc:
        'Crafted an immersive 3D portfolio experience using Three.js & React Three Fiber. Projects are displayed in an interactive flipbook format with realistic physics, smooth page transitions & WebGL rendering for a memorable browsing experience.',
      github: 'https://github.com/RiteshJha912/DevFlipper',
      live: 'https://dev-flipper.vercel.app/',
      tags: {
        stack: ['React', 'Three.js', 'React Three Fiber', 'Tailwind CSS', 'Vite', 'WebGL'],
        domain: ['Game Type', '3D Graphics', 'Interactive Design', 'Portfolio', 'Frontend']
      }
    },
    {
      src: slinket,
      h3: 'Slinket.io',
      shortDesc: 'Modern Snake Game',
      longDesc:
        'Recreated the classic Snake game with modern web technologies. Features responsive controls for desktop & mobile, dynamic difficulty scaling, pause/resume functionality & polished UI with smooth animations for an addictive gaming experience.',
      github: 'https://github.com/RiteshJha912/snake-game',
      live: 'https://snake-game-lemon-nu.vercel.app/',
      tags: {
        stack: ['React', 'Vite', 'JavaScript', 'CSS', 'Touch Events'],
        domain: ['Game Type', 'Gaming', 'Interactive', 'Mobile-First', 'Frontend']
      }
    },
    {
      src: coffercrypt,
      h3: 'CofferCrypt',
      shortDesc: 'Password Based File Encryption Tool',
      longDesc:
        'A simple & effective tool for encrypting & decrypting text files with a password using the Caesar cipher technique. Users can set a password that determines the encryption shift, making it secure & customizable. Demonstrates basic file handling & encryption techniques in C++.',
      github: 'https://github.com/RiteshJha912/CofferCrypt',
      live: null, // Add when available
      tags: {
        stack: ['C++', 'File I/O', 'Cryptography'],
        domain: ['Security', 'Encryption', 'Caesar Cipher', 'CLI Tool']
      }
    },
  ];

  const categories = ['All', 'Featured', 'Full-Stack', 'Blockchain', 'Security', 'AI/ML', 'Gaming'];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Logic for Featured category
      if (activeCategory === 'Featured') {
        const featuredProjects = [
            'Indradhanu Foundation', 
            'Democrazy', 
            'epoch', 
            'PaperOps.ai', 
            'DevFlipper'
        ];
        return featuredProjects.includes(project.h3);
      }

      // Check both stack and domain arrays for the active category
      // Handle mapping of "AI" to "AI/ML" or similar variations if necessary
      const allTags = [...(project.tags.stack || []), ...(project.tags.domain || [])];
      
      const matchesCategory = activeCategory === 'All' 
        || allTags.includes(activeCategory)
        || (activeCategory === 'Gaming' && allTags.includes('Game Type'))
        || (activeCategory === 'AI' && (allTags.includes('AI/ML') || allTags.includes('Agentic AI')));
      
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
        <h1>Projects</h1>
        <p className={styles.subtitle}>
         every weird and wonderful thing I've ever tinkered with
        </p>
      </div>

      <div className={`${styles.controls} ${styles.animateIn}`}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="search project " 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterTabs}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.filterTab} ${activeCategory === category ? styles.activeTab : ''} ${category === 'Featured' ? styles.featuredTab : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category === 'Featured' ? 'Featured' : category}
            </button>
          ))}
        </div>
      </div>

      <div className={`${styles.grid} ${styles.animateIn}`}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => {
            // Check if this project is one of the featured ones to apply special styling
            const isFeatured = [
                'Indradhanu Foundation', 
                'Democrazy', 
                'epoch', 
                'PaperOps.ai', 
                'DevFlipper'
            ].includes(project.h3);

            return (
                <div 
                  key={index} 
                  className={`${styles.card} ${isFeatured && activeCategory === 'Featured' ? styles.featuredCard : ''}`}
                >
                  <div className={styles.imageWrapper}>
                 {project.src ? (
                    <img src={project.src} alt={project.h3} data-project={project.h3} />
                 ) : (
                    <div className={styles.imagePlaceholder}></div>
                 )}
                  </div>
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
                          {project.h3 === 'DeBiased' ? (
                              <img src={ethlogonew} alt="ETHGlobal" className={styles.customIcon} />
                          ) : (
                              <FaExternalLinkAlt />
                          )}
                        </a>
                      )}
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
            );
          })
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