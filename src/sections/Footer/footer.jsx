import styles from './footerStyles.module.css'

function Footer() {
  return (
    <section id='footer' className={styles.container}>
      <p>
        Made with <span className={styles.heart}>🫀</span> by Ritesh
      </p>
    </section>
  )
}

export default Footer
