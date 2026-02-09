import React, { useState, useEffect } from 'react';
import styles from './BentoGrid.module.css';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from '../../common/themeContext';
import { FaCopy, FaDownload, FaEnvelope, FaEnvelopeOpen, FaFileAlt, FaPython, FaJava, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaCode, FaChartLine, FaEthereum, FaLightbulb, FaLink, FaFingerprint, FaBrain, FaDatabase, FaRobot, FaPalette, FaKey, FaHammer, FaArrowRight, FaCheck, FaRegCopy, FaGoogleDrive, FaMapMarkerAlt, FaCircle } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiSolidity, SiCplusplus, SiPug, SiNextdotjs, SiVite, SiTailwindcss, SiFramer, SiThreedotjs, SiChartdotjs, SiExpress, SiFastapi, SiFlask, SiMongodb, SiPostgresql, SiMysql, SiFirebase, SiGooglesheets, SiIpfs, SiPostman, SiJsonwebtokens, SiGoogle, SiAxios, SiDocker, SiKubernetes } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { IoLogoJavascript } from "react-icons/io5";

function BentoGrid() {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [visibleDays, setVisibleDays] = useState(365);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setVisibleDays(150); // ~5 months for small screens
      } else if (window.innerWidth < 768) {
        setVisibleDays(210); // ~7 months for tablets
      } else {
        setVisibleDays(null); // Full graph for desktop
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ritesh.exe@proton.me');
    setCopied(true);
    setIsEnvelopeOpen(true);
    setTimeout(() => setCopied(false), 1000);
    setTimeout(() => setIsEnvelopeOpen(false), 5000);
  };

  const transformData = (data) => {
    if (visibleDays) {
      return data.slice(-visibleDays);
    }
    return data;
  };

  const elegantTheme = {
    // Light Mode: Bg(Light), Levels: Light -> Black
    light: ['#ebedf0', '#b8b8b8', '#8a8a8a', '#5e5e5e', '#000000'],
    // Dark Mode: Bg(Dark), Levels: Dark -> White
    dark: ['#161b22', '#4a4a4a', '#7a7a7a', '#a9a9a9', '#ffffff'],
  };

  const technologies = [
    { name: 'JavaScript', icon: <IoLogoJavascript /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'Python', icon: <FaPython /> },
    { name: 'Solidity', icon: <SiSolidity /> },
    { name: 'C++', icon: <SiCplusplus /> },
    { name: 'Java', icon: <FaJava /> },
    { name: 'HTML5', icon: <FaHtml5 /> },
    { name: 'CSS3', icon: <FaCss3Alt /> },
    { name: 'Pug.js', icon: <SiPug /> },
    { name: 'React.js', icon: <FaReact /> },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'Vite', icon: <SiVite /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { name: 'Framer Motion', icon: <SiFramer /> },
    { name: 'Three.js', icon: <SiThreedotjs /> },
    { name: 'R3F', icon: <SiThreedotjs /> },
    { name: 'AOS', icon: <FaCode /> },
    { name: 'Chart.js', icon: <SiChartdotjs /> },
    { name: 'Recharts', icon: <FaChartLine /> },
    { name: 'CSS Modules', icon: <FaCss3Alt /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'Express.js', icon: <SiExpress /> },
    { name: 'FastAPI', icon: <SiFastapi /> },
    { name: 'Flask', icon: <SiFlask /> },
    { name: 'MongoDB', icon: <SiMongodb /> },
    { name: 'PostgreSQL', icon: <SiPostgresql /> },
    { name: 'MySQL', icon: <SiMysql /> },
    { name: 'Firebase', icon: <SiFirebase /> },
    { name: 'OpenSheets', icon: <SiGooglesheets /> },
    { name: 'Hardhat', icon: <FaHammer /> },
    { name: 'Ethers.js', icon: <FaEthereum /> },
    { name: 'Web3.js', icon: <FaEthereum /> },
    { name: 'IPFS', icon: <SiIpfs /> },
    { name: 'Filecoin', icon: <FaDatabase /> }, 
    { name: 'Lighthouse', icon: <FaLightbulb /> },
    { name: 'Kadena EVM', icon: <FaLink /> },
    { name: 'Self SDK', icon: <FaFingerprint /> },
    { name: 'LangChain', icon: <FaLink /> },
    { name: 'GroqAI', icon: <FaBrain /> },
    { name: 'Vector DB', icon: <FaDatabase /> },
    { name: 'GAN', icon: <FaRobot /> },
    { name: 'Pylette', icon: <FaPalette /> },
    { name: 'Git', icon: <FaGitAlt /> },
    { name: 'Docker', icon: <SiDocker /> },
    { name: 'Kubernetes', icon: <SiKubernetes /> },
    { name: 'GitHub', icon: <FaGithub /> },
    { name: 'Postman', icon: <SiPostman /> },
    { name: 'Clerk', icon: <FaKey /> },
    { name: 'Google Auth', icon: <SiGoogle /> },
    { name: 'JWT', icon: <SiJsonwebtokens /> },
    { name: 'Apps Script', icon: <SiGoogle /> },
    { name: 'Axios', icon: <SiAxios /> },
  ];

  return (
    <section className={styles.container}>
      {/* 1. About Me */}
      <div className={`${styles.card} ${styles.aboutCard}`}>
        <h3 className={styles.cardTitle}>About Me</h3>
        <p className={styles.aboutText}>
          So, hello 🙋🏻<br/>
          I am Ritesh, I build stuff on the internet, I have professionally worked across a bunch of domains, ranging from development, cybersecurity, blockchain, IoT to AI and much much more.<br/><br/>
          I am currently pursuing a Bachelor's of Information Technology degree at KJSCE, Vidyavihar and would be graduating in 2027. Outside of work, I enjoy listening to music while being on long walks (you'll almost always find me with my headphones on :), I also used to be deep into geopolitics at some point in time. Adding to all of this, I really like explaining concepts to people, and I weirdly love pitching ideas that I actually believe in.
        </p>
        
        <div className={styles.locationContainer}>
          <div className={styles.locationItem}>
            <FaMapMarkerAlt className={styles.locationIcon} />
            <span>Mumbai, India</span>
          </div>
          <div 
            className={styles.availabilityLink}
            onClick={() => document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Available for projects, HMU</span>
            <FaArrowRight className={styles.arrowIcon} />
          </div>
        </div>
      </div>

      {/* 2. Technologies */}
      <div className={`${styles.card} ${styles.techCard}`} style={{ overflow: 'hidden' }}>
        <h3 className={styles.cardTitle}>Tech Stack</h3>
        <div className={styles.marqueeWrapper}>
          {/* Row 1 */}
          <div className={styles.marqueeTrack}>
            {[...technologies.slice(0, 16), ...technologies.slice(0, 16)].map((tech, index) => (
              <span key={`row1-${index}`} className={styles.techBadge}>
                <span className={styles.techIcon}>{tech.icon}</span>
                {tech.name}
              </span>
            ))}
          </div>

          {/* Row 2 (Reverse) */}
          <div className={`${styles.marqueeTrack} ${styles.reverse}`}>
            {[...technologies.slice(16, 32), ...technologies.slice(16, 32)].map((tech, index) => (
              <span key={`row2-${index}`} className={styles.techBadge}>
                <span className={styles.techIcon}>{tech.icon}</span>
                {tech.name}
              </span>
            ))}
          </div>

          {/* Row 3 */}
          <div className={styles.marqueeTrack}>
            {[...technologies.slice(32), ...technologies.slice(32)].map((tech, index) => (
              <span key={`row3-${index}`} className={styles.techBadge}>
                <span className={styles.techIcon}>{tech.icon}</span>
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Other Skills */}
        <h3 className={styles.cardTitle} style={{ marginTop: '15px' }}>Other Skills</h3>
        <div className={styles.marqueeWrapper} style={{ marginTop: '0', padding: '5px 0' }}>
           <div className={styles.marqueeTrack}>
            {[
              "AI Agents", "Kali", "Pen-testing", "OSINT", 
              "Network Security", "SEO", "3D Graphics", "Cryptography", 
              "API Testing", "Serverless Data"
            ].map((skill, index) => (
                <span key={`skill-${index}`} className={styles.techBadge}>{skill}</span>
            ))}
            {[
              "AI Agents", "Auth & DevOps", "Kali", "Pen-testing", "OSINT", 
              "Network Security", "SEO", "3D Graphics", "Cryptography", 
              "API Testing", "Serverless Data"
            ].map((skill, index) => (
                <span key={`dup-${index}`} className={styles.techBadge}>{skill}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. GitHub Graph */}
      <div className={`${styles.card} ${styles.githubCard}`}>
        <h3 className={styles.cardTitle}>Days I Code</h3>
        <div className={styles.githubContent}>
          <GitHubCalendar 
            username="RiteshJha912"
            blockSize={10}
            blockRadius={3}
            blockMargin={3}
            fontSize={12}
            theme={elegantTheme}
            colorScheme={theme}
            transformData={transformData}
            hideColorLegend={visibleDays !== null && visibleDays < 365}
            hideMonthLabels={visibleDays !== null && visibleDays < 100}
            labels={{
              totalCount: `{{count}} contributions in the ${
                visibleDays === 150 ? 'last 5 months' :
                visibleDays === 210 ? 'last 7 months' : 'last year'
              }`
            }}
          />
        </div>
      </div>

      {/* 4. Email */}
      <div 
        className={`${styles.card} ${styles.emailCard}`} 
        onClick={handleCopyEmail}
      >
        {isEnvelopeOpen ? 
          <FaEnvelopeOpen className={`${styles.iconLarge} ${styles.iconOpen}`} /> 
          : 
          <FaEnvelope className={styles.iconLarge} />
        }
        <h3 className={styles.cardTitle} style={{ marginBottom: '5px' }}>Email</h3>
        <p className={styles.cardContent}>ritesh.exe@proton.me</p>
        <div className={styles.cardAction}>
          <span>Tap to Copy</span>
          {copied ? <FaCheck className={styles.actionIcon} /> : <FaRegCopy className={styles.actionIcon} />}
        </div>
      </div>

      {/* 5. CV Download */}
      <div 
        className={`${styles.card} ${styles.cvCard}`} 
        onClick={() => window.open('https://drive.google.com/file/d/1urfWKJuoSORMONmbX8-0qjpjha7hPXyt/view?usp=sharing', '_blank')}
      >
        <FaFileAlt className={styles.iconLarge} />
        <h3 className={styles.cardTitle} style={{ marginBottom: '5px' }}>Resume</h3>
        <p className={styles.cardContent}>View & Download</p>
        <div className={styles.cardAction}>
          <span>Google Drive</span>
          <FaGoogleDrive className={styles.actionIcon} />
        </div>
      </div>
    </section>
  );
}

export default BentoGrid;
