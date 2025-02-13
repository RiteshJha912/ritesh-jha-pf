import { useState, useEffect } from 'react'
import styles from './loadingScreen.module.css'

const LoadingScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(0)
  const [showConnectionStatus, setShowConnectionStatus] = useState(false)
  const [info, setInfo] = useState({
    onlineStatus: navigator.onLine ? 'Online' : 'Offline',
    browser: 'Detecting...',
    os: 'Detecting...',
    ip: 'Fetching...',
    location: 'Fetching...',
  })

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
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    if (/android/i.test(userAgent)) return 'Android'
    if (/iphone|ipad|ipod/i.test(userAgent)) return 'iOS'
    if (/macintosh|mac os/i.test(userAgent)) return 'macOS'
    if (/windows nt/i.test(userAgent)) return 'Windows'
    if (/linux/i.test(userAgent)) return 'Linux'
    return 'Unknown'
  }

  const fetchIP = async () => {
    const ipApis = [
      'https://api64.ipify.org?format=json',
      'https://checkip.amazonaws.com',
      'https://api.myip.com',
    ]

    for (let api of ipApis) {
      try {
        let response = await fetch(api)
        let data = api.includes('amazonaws')
          ? await response.text()
          : await response.json()
        return api.includes('amazonaws') ? data.trim() : data.ip || data
      } catch (error) {
        console.warn(`Failed to fetch IP from ${api}`)
      }
    }
    return 'Unavailable'
  }

  const fetchLocation = async (ip) => {
    if (ip === 'Unavailable') return 'Unavailable'

    const locationApis = [
      `https://ipwho.is/${ip}`,
      `http://ip-api.com/json/${ip}`,
      `https://ipinfo.io/${ip}/json`,
    ]

    let locations = []
    for (let api of locationApis) {
      try {
        let response = await fetch(api)
        let data = await response.json()
        if (data.city && data.country) {
          locations.push(`${data.city}, ${data.region}, ${data.country}`)
        }
      } catch (error) {
        console.warn(`Failed to fetch location from ${api}`)
      }
    }

    return locations.length ? locations[0] : 'Unavailable'
  }

  const loadCachedData = () => {
    const cachedData = localStorage.getItem('userInfo')
    return cachedData ? JSON.parse(cachedData) : null
  }

  const updateInfoStepByStep = async () => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms))
    const cachedData = loadCachedData()
    const isFirstLoad = !cachedData

    await delay(isFirstLoad ? 1500 : 750)
    setShowConnectionStatus(true)
    setProgress(20)

    setStep(1)
    await delay(isFirstLoad ? 1000 : 500)
    setProgress(35)

    if (cachedData) {
      setInfo(cachedData)
      setStep(2)
      await delay(250)
      setProgress(50)
      setStep(3)
      await delay(250)
      setProgress(65)
      setStep(4)
      await delay(250)
      setProgress(80)
      setStep(5)
      await delay(250)
      setProgress(100)

      updateCacheInBackground()
    } else {
      const newInfo = {
        onlineStatus: navigator.onLine ? 'Online' : 'Offline',
        browser: getBrowser(),
        os: getOS(),
        ip: await fetchIP(),
        location: 'Fetching...',
      }

      setInfo((prev) => ({ ...prev, browser: newInfo.browser }))
      setStep(2)
      await delay(1000)
      setProgress(50)

      setInfo((prev) => ({ ...prev, os: newInfo.os }))
      setStep(3)
      await delay(1000)
      setProgress(65)

      setInfo((prev) => ({ ...prev, ip: newInfo.ip }))
      setStep(4)
      await delay(1000)
      setProgress(80)

      const location =
        newInfo.ip !== 'Unavailable'
          ? await fetchLocation(newInfo.ip)
          : 'Unavailable'
      newInfo.location = location

      setInfo(newInfo)
      localStorage.setItem('userInfo', JSON.stringify(newInfo))

      setStep(5)
      await delay(500)
      setProgress(100)
    }

    setTimeout(onFinish, 500)
  }

  const updateCacheInBackground = async () => {
    const newInfo = {
      onlineStatus: navigator.onLine ? 'Online' : 'Offline',
      browser: getBrowser(),
      os: getOS(),
      ip: await fetchIP(),
      location: 'Fetching...',
    }

    newInfo.location =
      newInfo.ip !== 'Unavailable'
        ? await fetchLocation(newInfo.ip)
        : 'Unavailable'

    localStorage.setItem('userInfo', JSON.stringify(newInfo))
  }

  useEffect(() => {
    updateInfoStepByStep()

    const updateConnectionStatus = () => {
      setInfo((prev) => ({
        ...prev,
        onlineStatus: navigator.onLine ? 'Online' : 'Offline',
      }))
    }

    window.addEventListener('online', updateConnectionStatus)
    window.addEventListener('offline', updateConnectionStatus)

    return () => {
      window.removeEventListener('online', updateConnectionStatus)
      window.removeEventListener('offline', updateConnectionStatus)
    }
  }, [onFinish])

  return (
    <div className={styles.loader}>
      {!showConnectionStatus ? (
        <p>Establishing connection...</p>
      ) : (
        <p>
          Connection Status:{' '}
          <span
            className={
              info.onlineStatus === 'Online' ? styles.online : styles.offline
            }
          >
            {info.onlineStatus === 'Online' ? 'Online' : '🔴 Offline'}
          </span>
        </p>
      )}
      {step >= 1 && <p>Client: {info.browser}</p>}
      {step >= 2 && <p>OS: {info.os}</p>}
      {step >= 3 && <p>IP Address: {info.ip}</p>}
      {step >= 4 && <p>Location: {info.location}</p>}
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default LoadingScreen
