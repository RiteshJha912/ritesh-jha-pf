import { useEffect, useState } from 'react'
import styles from './footerStyles.module.css'

function Footer() {
  const [info, setInfo] = useState({
    onlineStatus: navigator.onLine ? 'Online' : 'Offline',
    browser: 'Detecting...',
    os: 'Detecting...',
    ip: 'Fetching...',
    location: 'Fetching...',
  })

  useEffect(() => {
    const getBrowser = () => {
      const userAgent = navigator.userAgent
      if (navigator.brave) return 'Brave'
      if (/edg\//i.test(userAgent)) return 'Edge'
      if (/opr\//i.test(userAgent) || /opera/i.test(userAgent)) return 'Opera'
      if (/firefox|fxios/i.test(userAgent)) return 'Firefox'
      if (
        /chrome|crios/i.test(userAgent) &&
        !/edg\//i.test(userAgent) &&
        !navigator.brave
      )
        return 'Chrome'
      if (/safari/i.test(userAgent) && !/chrome|crios|edg/i.test(userAgent))
        return 'Safari'
      return 'Unknown'
    }

    const getOS = () => {
      const userAgent = navigator.userAgent
      if (/windows nt/i.test(userAgent)) return 'Windows'
      if (/macintosh|mac os/i.test(userAgent)) return 'macOS'
      if (/linux/i.test(userAgent)) return 'Linux'
      if (/android/i.test(userAgent)) return 'Android'
      if (/iphone|ipad|ipod/i.test(userAgent)) return 'iOS'
      return 'Unknown'
    }

    // Fetch IPv4 Address
    const fetchIP = async () => {
      try {
        const response = await fetch('https://api4.ipify.org?format=json')
        const data = await response.json()
        return data.ip
      } catch {
        return 'Unavailable'
      }
    }

    const fetchLocation = async (ip) => {
      try {
        const response = await fetch(`https://ipwho.is/${ip}`)
        const data = await response.json()
        if (data.success) {
          return `${data.city}, ${data.region}, ${data.country}`
        }
        return 'Unavailable'
      } catch {
        return 'Unavailable'
      }
    }

    const updateIPAndLocation = async () => {
      const ip = await fetchIP()
      const location =
        ip !== 'Unavailable' ? await fetchLocation(ip) : 'Unavailable'
      setInfo((prev) => ({
        ...prev,
        ip,
        location,
      }))
    }

    const updateOnlineStatus = () => {
      setInfo((prev) => ({
        ...prev,
        onlineStatus: navigator.onLine ? 'Online' : 'Offline',
      }))
    }

    setInfo((prev) => ({
      ...prev,
      browser: getBrowser(),
      os: getOS(),
    }))

    updateIPAndLocation()

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  return (
    <section id='footer' className={styles.container}>
      <p>
        Connection Status:{' '}
        <span
          className={`${styles.status} ${
            info.onlineStatus === 'Online' ? styles.online : styles.offline
          }`}
        >
          {info.onlineStatus === 'Online' ? '🟢 Online' : '🔴 Offline'}
        </span>
      </p>
      <p>Browser: {info.browser}</p>
      <p>OS: {info.os}</p>
      <p>IP Address: {info.ip}</p>
      <p>Location: {info.location}</p>
      <p>
        Made with <span className={styles.heart}>🫀</span> by Ritesh
      </p>
    </section>
  )
}

export default Footer
