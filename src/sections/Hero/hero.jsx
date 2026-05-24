import { useEffect, useState } from 'react'
import styles from './heroStyles.module.css'
import sun from '../../assets/sun.svg'
import moon from '../../assets/moon.svg'
import githubLight from '../../assets/github-light.svg'
import githubDark from '../../assets/github-dark.svg'
import linkedinLight from '../../assets/linkedin-light.svg'
import linkedinDark from '../../assets/linkedin-dark.svg'

// import heroImg from '../../assets/MainPic3.jpg'
import heroImg from '../../assets/mp2.jpg'

import { useTheme } from '../../common/themeContext'
import startPreloading from '../../common/imagePreloader'
import projectImages from '../../data/projectImages'

function Hero({ onImageLoad, isLoaded }) {
  const { theme, toggleTheme } = useTheme()
  const themeIcon = theme === 'light' ? sun : moon
  const githubIcon = theme === 'light' ? githubLight : githubDark
  const linkedinIcon = theme === 'light' ? linkedinLight : linkedinDark

  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopIndex, setLoopIndex] = useState(0)
  const [rotationDegrees, setRotationDegrees] = useState(0)

  const texts = ['Ritesh Jha', 'Hazardous']
  const typingSpeed = 125
  const erasingSpeed = 40
  const delayBetweenWords = 1500

  const [showThemeTooltip, setShowThemeTooltip] = useState(false)
  const handleImageClick = () => {
    setRotationDegrees((prev) => prev + 180)
  }

  useEffect(() => {
    let count = 0
    const tooltipIntervals = [3900, 70000, 150000]

    const showTooltip = () => {
      if (count < tooltipIntervals.length) {
        setShowThemeTooltip(true)
        setTimeout(() => setShowThemeTooltip(false), 3500)
        count++
      }
    }

    const tooltipTimers = tooltipIntervals.map((time, index) =>
      setTimeout(() => {
        showTooltip()
      }, time),
    )

    return () => {
      tooltipTimers.forEach(clearTimeout)
    }
  }, [])

  // Start preloading project images after the Home page has painted and
  // the page is interactive. We use double rAF to ensure paint completed,
  // then requestIdleCallback (with fallback) to run preload during idle time.
  useEffect(() => {
    if (!projectImages || projectImages.length === 0) return

    // Respect user network preferences: startPreloading checks save-data/effectiveType
    let cancelled = false

    const start = () => {
      if (cancelled) return
      // copy array so module-level preloader can mutate safely
      const imgs = projectImages.slice()
      // startPreloading returns a cancel function
      const cancel = startPreloading(imgs, { batchSize: 4 })
      // store cancel on closure for cleanup
      cleanup.cancel = cancel
    }

    // Wait for the next two animation frames to ensure the page has rendered
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        // Schedule during idle time
        if ('requestIdleCallback' in window) {
          const id = window.requestIdleCallback(() => start(), {
            timeout: 3000,
          })
          cleanup.idle = () => window.cancelIdleCallback(id)
        } else {
          // fallback to small timeout
          const t = setTimeout(() => start(), 1200)
          cleanup.timeout = () => clearTimeout(t)
        }
      })
      cleanup.raf2 = () => cancelAnimationFrame(raf2)
    })
    const cleanup = {
      raf1: () => cancelAnimationFrame(raf1),
      raf2: null,
      idle: null,
      timeout: null,
      cancel: null,
    }

    return () => {
      cancelled = true
      cleanup.raf1 && cleanup.raf1()
      cleanup.raf2 && cleanup.raf2()
      cleanup.idle && cleanup.idle()
      cleanup.timeout && cleanup.timeout()
      cleanup.cancel && cleanup.cancel()
    }
  }, [])

  useEffect(() => {
    let timer

    const handleTyping = () => {
      const currentWord = texts[loopIndex % texts.length]
      const nextWord = currentWord.substring(
        0,
        currentText.length + (isDeleting ? -1 : 1),
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
          isDeleting ? erasingSpeed : typingSpeed,
        )
      }
    }

    timer = setTimeout(handleTyping, isDeleting ? erasingSpeed : typingSpeed)

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, loopIndex, texts])

  return (
    <section id='hero' className={styles.container}>
      <div className={styles.colorModeContainer}>
        <div className={styles.flipContainer} onClick={handleImageClick}>
          <div
            className={styles.flipper}
            style={{ transform: `rotateY(${rotationDegrees}deg)` }}
          >
            <div className={styles.front}>
              <img
                className={styles.hero}
                src={heroImg}
                alt='Profile Picture of Ritesh Jha'
                onLoad={onImageLoad}
                onError={onImageLoad}
              />
            </div>
            <div className={styles.back}>
              <div className={styles.backText}>hmm, van gogh!</div>
            </div>
          </div>
        </div>
        {/* <div className={styles.themeButtonContainer}>
          <img
            className={styles.colorMode}
            src={themeIcon}
            alt='Color Mode Icon'
            onClick={toggleTheme}
          />
          {showThemeTooltip && (
            <div className={styles.themeTooltip}>
              Switch
              <br /> theme here
            </div>
          )}
        </div> */}
      </div>

      <div className={styles.info}>
        <h2 className={styles.h2}>
          {' '}
          <span className={styles.codeBracket}>{'>'}_</span> Hi I am{' '}
        </h2>
        <div className={styles.typewriterContainer}>
          <h1 className={styles.typewriter}>
            <span>{currentText || '\u00A0'}</span>
          </h1>
        </div>
        <h3 className={styles.h3Slide}>
          <span className={styles.codeBracket}>{'<'}</span>
          Learner
          <span className={styles.codeBracket}>{'/>'}</span>
        </h3>
        <h3 className={styles.h3Slide}>
          <span className={styles.codeBracket}>{'<'}</span>
          Fullstack Developer
          <span className={styles.codeBracket}>{'/>'}</span>
        </h3>
        {/* <h3 className={styles.h3Slide}>
          <span className={styles.codeBracket}>{'<'}</span>
          Open Source Contributor
          <span className={styles.codeBracket}>{'/>'}</span>
        </h3> */}
        <h3 className={styles.h3Slide}>
          <span className={styles.codeBracket}>{'<'}</span>
          Digital Security Enthusiast
          <span className={styles.codeBracket}>{'/>'}</span>
        </h3>

        <div className={styles.logoContainer}>
          <div
            onClick={() =>
              window.open('https://github.com/RiteshJha912', '_blank')
            }
            className={styles.logoWrapper}
          >
            <img src={githubIcon} alt='Github Icon' className={styles.logo} />
            <div className={styles.tooltip}>GitHub</div>
          </div>
          <div
            onClick={() =>
              window.open('https://www.linkedin.com/in/ritesh-j/', '_blank')
            }
            className={styles.logoWrapper}
          >
            <img
              src={linkedinIcon}
              alt='LinkedIn Icon'
              className={styles.logo}
            />
            <div className={styles.tooltip}>LinkedIn</div>
          </div>
        </div>

        <p className={styles.description}>
          after being in the dev space for a while, i felt i too needed a sweet
          little corner on the internet for myself, and thats how this website
          came into existence! its just a checkpoint, a reminder that i didn't
          quit & also picked up some{' '}
          <span
            onClick={() =>
              window.open(
                'https://www.merriam-webster.com/dictionary/ritzy#:~:text=%3A%20impressively%20or%20ostentatiously%20fancy%20or,ritziness%20noun',
                '_blank',
                'noopener,noreferrer',
              )
            }
            className={styles.ritzyLink}
            role='button'
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              window.open(
                'https://www.merriam-webster.com/dictionary/ritzy#:~:text=%3A%20impressively%20or%20ostentatiously%20fancy%20or,ritziness%20noun',
                '_blank',
                'noopener,noreferrer',
              )
            }
            style={{ display: 'inline', cursor: 'pointer' }}
          >
            ritziness
          </span>{' '}
          along the way
        </p>

        <button
          className={styles.hireBtn}
          onClick={() =>
            document
              .getElementById('connect')
              .scrollIntoView({ behavior: 'smooth' })
          }
        >
          <div className={styles.btnTextContainer}>
            <span className={styles.btnText}>Hire me!</span>
            <span className={styles.btnTextHover}>Let's Talk</span>
          </div>
        </button>
      </div>
    </section>
  )
}

export default Hero
