import React from 'react'
import styles from './Connect.module.css'
import Terminal from './Terminal'
import { 
  SiGmail, 
  SiDiscord, 
  SiInstagram, 
  SiGithub, 
  SiLeetcode,
  SiCodechef
} from 'react-icons/si'
import { FaCode, FaArrowRight } from 'react-icons/fa'
import { MdEmail, MdAlternateEmail } from 'react-icons/md'

function Connect() {
  return (
    <section id="connect" className={styles.section}>
      <h1 className="sectionTitle">Connect</h1>
      <div className={styles.container}>
        
        {/* Left Column: Socials & Contact */}
        <div className={styles.leftColumn}>
            
            {/* Contact Tier */}
            <div className={`${styles.card} ${styles.contactTier}`}>
                <h3 className={styles.tierTitle}>Start a Conversation</h3>
                <div className={styles.linksContainer}>
                    <a href="mailto:ritesh.exe@proton.me" className={styles.linkItem} target="_blank" rel="noopener noreferrer">
                        <span className={styles.icon}><MdEmail /></span>
                        <span className={styles.linkText}>ritesh.exe@proton.me</span>
                        <span className={styles.arrow}><FaArrowRight size={12}/></span>
                    </a>
                    <a href="mailto:riteshjha2174@gmail.com" className={styles.linkItem} target="_blank" rel="noopener noreferrer">
                        <span className={styles.icon}><MdAlternateEmail /></span>
                        <span className={styles.linkText}>riteshjha2174@gmail.com</span>
                        <span className={styles.arrow}><FaArrowRight size={12}/></span>
                    </a>
                </div>
            </div>

            {/* Socials Tier */}
            <div className={`${styles.card} ${styles.socialsTier}`}>
                <h3 className={styles.tierTitle}>Socials</h3>
                <div className={styles.linksContainer}>
                    <a href="https://discord.com/users/hazardous_912" className={styles.linkItem} target="_blank" rel="noopener noreferrer">
                        <span className={styles.icon}><SiDiscord /></span>
                        <span className={styles.linkText}>@hazardous_912</span>
                        <div className={styles.arrow}><FaArrowRight size={12} /></div>
                    </a>
                    <a href="https://www.instagram.com/ritzardous/" className={styles.linkItem} target="_blank" rel="noopener noreferrer">
                        <span className={styles.icon}><SiInstagram /></span>
                        <span className={styles.linkText}>@ritzardous</span>
                        <div className={styles.arrow}><FaArrowRight size={12} /></div>
                    </a>
                </div>
            </div>

            {/* Coding Accounts Tier */}
            <div className={`${styles.card} ${styles.codingTier}`}>
                <h3 className={styles.tierTitle}>Coding Profiles</h3>
                <div className={styles.linksContainer}>
                   <a href="https://github.com/RiteshJha912" className={styles.linkItem} target="_blank" rel="noopener noreferrer">
                        <span className={styles.icon}><SiGithub /></span>
                        <span className={styles.linkText}>@RiteshJha912</span>
                        <div className={styles.arrow}><FaArrowRight size={12} /></div>
                    </a>
                    <a href="https://leetcode.com/u/ritzardous/" className={styles.linkItem} target="_blank" rel="noopener noreferrer">
                        <span className={styles.icon}><SiLeetcode /></span>
                        <span className={styles.linkText}>@ritzardous</span>
                        <div className={styles.arrow}><FaArrowRight size={12} /></div>
                    </a>
                    <a href="https://www.codechef.com/users/ritzardous" className={styles.linkItem} target="_blank" rel="noopener noreferrer">
                        <span className={styles.icon}><SiCodechef /></span>
                        <span className={styles.linkText}>@ritzardous</span>
                        <div className={styles.arrow}><FaArrowRight size={12} /></div>
                    </a>
                    <a href="https://codolio.com/profile/ritzardous" className={styles.linkItem} target="_blank" rel="noopener noreferrer">
                        <span className={styles.icon}><FaCode /></span>
                        <span className={styles.linkText}>@ritzardous</span>
                        <div className={styles.arrow}><FaArrowRight size={12} /></div>
                    </a>
                </div>
            </div>

        </div>

        {/* Right Column: Terminal */}
        <div className={styles.rightColumn}>
          <div className={styles.card} style={{ height: '100%', padding: '0', overflow: 'hidden', border: 'none', background: 'transparent' }}>
            <Terminal />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Connect
