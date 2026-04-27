import { useEffect, useState } from 'react'
import styles from './footerStyles.module.css'

function Footer() {
  const [onlineStatus, setOnlineStatus] = useState(
    navigator.onLine ? 'Online' : 'Offline'
  )

  useEffect(() => {
    const updateOnlineStatus = () => {
      setOnlineStatus(navigator.onLine ? 'Online' : 'Offline')
    }

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  return (
    <section id='footer' className={styles.container}>
      <div className={styles.leftSection}>
        <p>
          Connection Status:{' '}
          <span
            className={`${styles.status} ${
              onlineStatus === 'Online' ? styles.online : styles.offline
            }`}
          >
            {onlineStatus === 'Online' ? 'Online' : '🔴 Offline'}
          </span>
        </p>
        <p>
          Made with <span className={styles.heart}>🫀</span> by Ritesh
        </p>
      </div>
      <div className={styles.rightSection}>
        <img src="/autograph-ritesh-jha.png" alt="Ritesh's Autograph" className={styles.autograph} />
      </div>
    </section>
  )
}

export default Footer
