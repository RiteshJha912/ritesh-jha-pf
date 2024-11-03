import styles from './heroStyles.module.css'
import heroImg from '../../assets/MainPic.jpg'
import sun from '../../assets/sun.svg'
import moon from '../../assets/moon.svg'
import githubLight from '../../assets/github-light.svg'
import githubDark from '../../assets/github-dark.svg'
import linkedinLight from '../../assets/linkedin-light.svg'
import linkedinDark from '../../assets/linkedin-dark.svg'
import CV from '../../assets/Ritesh Jha CV.pdf'
import { useTheme } from '../../common/themeContext'

function Hero() {
  const { theme, toggleTheme } = useTheme()

  const themeIcon = theme === 'light' ? sun : moon
  const githubIcon = theme === 'light' ? githubLight : githubDark
  const linkedinIcon = theme === 'light' ? linkedinLight : linkedinDark

  return (
    <section id='hero' className={styles.container}>
      <div className={styles.colorModeContainer}>
        <img
          className={styles.hero}
          src={heroImg}
          alt='Profile Picture of Ritesh Jha'
        />
        <img
          className={styles.colorMode}
          src={themeIcon}
          alt='Color Mode Icon'
          onClick={toggleTheme}
        />
      </div>

      <div className={styles.info}>
        <h1 className={styles.typewriter}>Ritesh Jha</h1>
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
          Hello! I'm Ritesh, a digital architect who merges code with
          creativity.
          <br />
          <br /> Curious to see how I transform ideas into digital reality?
          Let’s embark on this adventure together!
        </p>
        <a href={CV} download>
          <button className='hover'>Resumé</button>
        </a>
      </div>
    </section>
  )
}

export default Hero
