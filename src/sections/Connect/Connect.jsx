import React, { useState } from 'react'
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
import { IoCopy, IoCheckmark } from 'react-icons/io5'
import codolioIcon from '../../assets/codolioicon.png'

function Connect() {
  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

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
                </div>
            </div>

            {/* Socials Tier */}
            <div className={`${styles.card} ${styles.socialsTier}`}>
                <h3 className={styles.tierTitle}>Socials</h3>
                <div className={styles.linksContainer}>
                    <a href="https://discord.com/users/hazardous_912" className={styles.linkItem} target="_blank" rel="noopener noreferrer">
                        <span className={styles.icon}><SiDiscord /></span>
                        <span className={styles.linkText}>@hazardous_912</span>
                        <button 
                          className={styles.copyBtn}
                          onClick={(e) => { e.preventDefault(); handleCopy('hazardous_912', 'discord'); }}
                          title="Copy ID"
                        >
                          {copiedId === 'discord' ? <IoCheckmark /> : <IoCopy />}
                        </button>
                        <div className={styles.arrow}><FaArrowRight size={12} /></div>
                    </a>
                    <a href="https://www.instagram.com/ritzardous/" className={styles.linkItem} target="_blank" rel="noopener noreferrer">
                        <span className={styles.icon}><SiInstagram /></span>
                        <span className={styles.linkText}>@ritzardous</span>
                        <button 
                          className={styles.copyBtn}
                          onClick={(e) => { e.preventDefault(); handleCopy('ritzardous', 'instagram'); }}
                          title="Copy ID"
                        >
                          {copiedId === 'instagram' ? <IoCheckmark /> : <IoCopy />}
                        </button>
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
                        <button 
                          className={styles.copyBtn}
                          onClick={(e) => { e.preventDefault(); handleCopy('RiteshJha912', 'github'); }}
                          title="Copy ID"
                        >
                          {copiedId === 'github' ? <IoCheckmark /> : <IoCopy />}
                        </button>
                        <div className={styles.arrow}><FaArrowRight size={12} /></div>
                    </a>
                    <a href="https://leetcode.com/u/ritzardous/" className={styles.linkItem} target="_blank" rel="noopener noreferrer">
                        <span className={styles.icon}><SiLeetcode /></span>
                        <span className={styles.linkText}>@ritzardous</span>
                        <button 
                          className={styles.copyBtn}
                          onClick={(e) => { e.preventDefault(); handleCopy('ritzardous', 'leetcode'); }}
                          title="Copy ID"
                        >
                          {copiedId === 'leetcode' ? <IoCheckmark /> : <IoCopy />}
                        </button>
                        <div className={styles.arrow}><FaArrowRight size={12} /></div>
                    </a>
                    <a href="https://www.codechef.com/users/ritzardous" className={styles.linkItem} target="_blank" rel="noopener noreferrer">
                        <span className={styles.icon}><SiCodechef /></span>
                        <span className={styles.linkText}>@ritzardous</span>
                        <button 
                          className={styles.copyBtn}
                          onClick={(e) => { e.preventDefault(); handleCopy('ritzardous', 'codechef'); }}
                          title="Copy ID"
                        >
                          {copiedId === 'codechef' ? <IoCheckmark /> : <IoCopy />}
                        </button>
                        <div className={styles.arrow}><FaArrowRight size={12} /></div>
                    </a>
                    <a href="https://codolio.com/profile/ritzardous" className={styles.linkItem} target="_blank" rel="noopener noreferrer">
                        <span className={styles.icon}>
                            <img src={codolioIcon} alt="Codolio" className={styles.codolioImg} />
                        </span>
                        <span className={styles.linkText}>@ritzardous</span>
                        <button 
                          className={styles.copyBtn}
                          onClick={(e) => { e.preventDefault(); handleCopy('ritzardous', 'codolio'); }}
                          title="Copy ID"
                        >
                          {copiedId === 'codolio' ? <IoCheckmark /> : <IoCopy />}
                        </button>
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
