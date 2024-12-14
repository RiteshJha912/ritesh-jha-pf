import { useEffect } from 'react'
import styles from './skillsStyles.module.css'
import SkillList from '../../common/skillList'
import AOS from 'aos'
import 'aos/dist/aos.css'

function skills() {
  useEffect(() => {
    AOS.init({ duration: 1000 }) // Initialize AOS with animation duration
  }, [])

  return (
    <section id='skills' className={styles.container}>
      <h1 className='sectionTitle'>Skills 🧠</h1>

      <div className={styles.skillList} data-aos='zoom-in'>
        <SkillList skill='OSINT' />
        <SkillList skill='Network Security' />
      </div>
      <hr data-aos='zoom-in' />

      <div className={styles.skillList} data-aos='zoom-in'>
        <SkillList skill='MongoDB' />
        <SkillList skill='MySQL' />
        <SkillList skill='PostgreSQL' />
      </div>
      <hr data-aos='zoom-in' />

      <div className={styles.skillList} data-aos='zoom-in'>
        <SkillList skill='C++' />
        <SkillList skill='Java' />
        <SkillList skill='Python' />
        <SkillList skill='Java' />
        <SkillList skill='JavaScript' />
      </div>
      <hr data-aos='zoom-in' />

      <div className={styles.skillList} data-aos='zoom-in'>
        <SkillList skill='Git' />
        <SkillList skill='Postman' />
        <SkillList skill='Firebase' />
        <SkillList skill='Clerk' />
        <SkillList skill='Kali Linux' />
      </div>
      <hr data-aos='zoom-in' />

      <div className={styles.skillList} data-aos='zoom-in'>
        <SkillList skill='HTML' />
        <SkillList skill='CSS' />
        <SkillList skill='React.js' />
        <SkillList skill='Three.js' />
        <SkillList skill='Node.js' />
        <SkillList skill='Express.js' />
        <SkillList skill='Pug.js' />
        <SkillList skill='Flask' />
        <SkillList skill='REST API' />
      </div>
    </section>
  )
}

export default skills
