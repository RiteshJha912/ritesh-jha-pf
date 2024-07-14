import styles from './skillsStyles.module.css'
import SkillList from '../../common/skillList'

function skills() {
  return (
    <section id='skills' className={styles.container}>
        <h1 className='sectionTitle'>Skills</h1>

        <div className={styles.skillList}>
        <SkillList skill="HTML "/>
        <SkillList skill="CSS "/>
        <SkillList skill="JavaScript"/>
        </div>
        <hr />
        <div className={styles.skillList}>
        <SkillList skill="ReactJS"/>
        <SkillList skill="NodeJS"/>
        <SkillList skill="PugJS"/>
        <SkillList skill="MongoDB"/>
        </div>
        <hr />
        <div className={styles.skillList}>
        <SkillList skill="C++"/>
        <SkillList skill="C"/>
        <SkillList skill="Python"/>
        <SkillList skill="OSINT"/>
        <SkillList skill="Network Security"/>
        </div>
        
    </section>
  )
}

export default skills
