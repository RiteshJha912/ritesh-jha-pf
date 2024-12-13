import { useEffect, useState } from 'react'
import styles from './heroStyles.module.css'
import heroImg from '../../assets/MainPic2.jpg'
import sun from '../../assets/sun.svg'
import moon from '../../assets/moon.svg'
import githubLight from '../../assets/github-light.svg'
import githubDark from '../../assets/github-dark.svg'
import linkedinLight from '../../assets/linkedin-light.svg'
import linkedinDark from '../../assets/linkedin-dark.svg'

import { useTheme } from '../../common/themeContext'

function Hero() {
  const { theme, toggleTheme } = useTheme()
  const themeIcon = theme === 'light' ? sun : moon
  const githubIcon = theme === 'light' ? githubLight : githubDark
  const linkedinIcon = theme === 'light' ? linkedinLight : linkedinDark

  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopIndex, setLoopIndex] = useState(0)

  const texts = ['Ritesh Jha', 'Hazardous']
  const typingSpeed = 125
  const erasingSpeed = 40
  const delayBetweenWords = 1500

  // theme tooltip 
  const [showThemeTooltip, setShowThemeTooltip] = useState(false)

  useEffect(() => {
    const tooltipTimer = setTimeout(() => {
      setShowThemeTooltip(true)
      setTimeout(() => {
        setShowThemeTooltip(false)
      }, 3500) 
    }, 4500) 

    return () => clearTimeout(tooltipTimer)
  }, [])

  useEffect(() => {
    let timer

    const handleTyping = () => {
      const currentWord = texts[loopIndex % texts.length]
      const nextWord = currentWord.substring(
        0,
        currentText.length + (isDeleting ? -1 : 1)
      )

      setCurrentText(nextWord)

      if (!isDeleting && nextWord === currentWord) {
        timer = setTimeout(() => setIsDeleting(true), delayBetweenWords)
      } else if (isDeleting && nextWord === '') {
        setIsDeleting(false)
        setLoopIndex(loopIndex + 1)
      } else {
        timer = setTimeout(
          handleTyping,
          isDeleting ? erasingSpeed : typingSpeed
        )
      }
    }

    timer = setTimeout(handleTyping, isDeleting ? erasingSpeed : typingSpeed)

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, loopIndex, texts])

  return (
    <section id='hero' className={styles.container}>
      <div className={styles.colorModeContainer}>
        <img
          className={styles.hero}
          src={heroImg}
          alt='Profile Picture of Ritesh Jha'
        />
        <div className={styles.themeButtonContainer}>
          <img
            className={styles.colorMode}
            src={themeIcon}
            alt='Color Mode Icon'
            onClick={toggleTheme}
          />
          {showThemeTooltip && (
            <div className={styles.themeTooltip}>Switch to<br/> Light Mode</div>
          )}
        </div>
      </div>

      <div className={styles.info}>
        <h2 className={styles.h2}> {'>'}_ Hi I am </h2>
        <h1 className={styles.typewriter}>
          <span>{currentText}</span>
        </h1>
        <h3 className={styles.h3Slide}>Programmer</h3>
        <h3 className={styles.h3Slide}>Fullstack Developer</h3>
        <h3 className={styles.h3Slide}>Open Source Contributor</h3>
        <h3 className={styles.h3Slide}>Digital Security Enthusiast</h3>

        <div className={styles.logoContainer}>
          <a
            href='https://github.com/RiteshJha912'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src={githubIcon} alt='Github Icon' className={styles.logo} />
            <div className={styles.tooltip}>GitHub</div>
          </a>
          <a
            href='https://www.linkedin.com/in/ritesh-jha-aa490a286/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src={linkedinIcon}
              alt='LinkedIn Icon'
              className={styles.logo}
            />
            <div className={styles.tooltip}>LinkedIn</div>
          </a>
        </div>
        <p className={styles.description}>
          From writing code that solves problems to creating meaningful
          experiences, I always try to stay curious and driven.
          <br />
          <br />
          This portfolio isn’t just a showcase, it’s a glimpse into how I think
          and what I love doing the most.
        </p>
        <a
          href='https://drive.google.com/file/d/1JmQCayAbLI8r-QRFkfRs0c43zhq-Ew09/view?usp=drive_link'
          target='_blank'
          rel='noopener noreferrer'
        >
          <button className='hover'>Resumé</button>
        </a>
      </div>
    </section>
  )
}

export default Hero
