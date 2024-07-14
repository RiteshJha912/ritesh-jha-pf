import styles from './heroStyles.module.css'
import heroImg from '../../assets/MainPic.png'
import sun from '../../assets/sun.svg'
import moon from '../../assets/moon.svg'
import githubLight from '../../assets/github-light.svg'
import githubDark from '../../assets/github-dark.svg'
import linkedinLight from '../../assets/linkedin-light.svg'
import linkedinDark from '../../assets/linkedin-dark.svg'
import CV from '../../assets/Ritesh Jha CV.pdf'
import { useTheme } from '../../common/themeContext'

function Hero() {
    const {theme, toggleTheme} = useTheme();

   const themeIcon = theme ==='light' ? sun : moon;
   const githubIcon = theme ==='light' ? githubLight:githubDark;
   const linkedinIcon = theme ==='light' ? linkedinLight:linkedinDark;

  return (
    <section id='hero' className={styles.container}>
        <div className={styles.colorModeContainer}>
            <img
            className={styles.hero}
            src={heroImg} 
            alt="Profile Picture of Ritesh Jha" 
            />
            <img 
            className={styles.colorMode}
            src={themeIcon} 
            alt="Color Mode Icon" 
            onClick={toggleTheme}
            />
            
        </div>

        <div className={styles.info}>
            <h1 className={styles.typewriter}>
                Ritesh Jha
            </h1>
            <h3>Coder</h3>
            <h3>Fullstack Developer</h3>
            <h3>Digital Security Enthusiast</h3>
            <span>
            <a href="https://github.com/RiteshJha912" target='_blank'>
                <img src={githubIcon} alt="Github Icon" />
            </a>
            <a href="https://www.linkedin.com/in/ritesh-jha-aa490a286/" target='_blank'>
                <img src={linkedinIcon} alt="Linkedin Icon" />
            </a>
            </span>
            <p className={styles.description}>Hello there! I am Ritesh, a Coder with a knack for fortifying digital realms & crafting seamless web experiences, always pushing the boundaries of what's possible.</p>
            <a href={CV} download>
                <button className='hover' >
                    Resumé
                </button>
            </a>
        </div>
    </section>
  )
}

export default Hero
