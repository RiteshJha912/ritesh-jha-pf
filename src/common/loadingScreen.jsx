import { useState, useEffect } from 'react'
import styles from './loadingScreen.module.css'

const LoadingScreen = ({ onFinish, isHeroLoaded }) => {
  // state to track the loading progress in percentage (0 to 100)
  const [progress, setProgress] = useState(0)

  // state to track the current step of the loading process
  const [step, setStep] = useState(0)

  // state to control the visibility of connection status display
  const [showConnectionStatus, setShowConnectionStatus] = useState(false)
  
  // state to track when the internal loading steps are complete
  const [readyToFinish, setReadyToFinish] = useState(false)

  // state to store user system details such as online status, browser, OS, IP, and location
  const [info, setInfo] = useState({
    onlineStatus: navigator.onLine ? 'Online' : 'Offline',
    browser: 'Detecting...',
    os: 'Detecting...',
    ip: 'Detecting...',
    location: 'Detecting...',
  })

  // function to detect the user's browser from the userAgent string
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

  // function to detect the user's operating system from the userAgent string
  const getOS = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    if (/android/i.test(userAgent)) return 'Android'
    if (/iphone|ipad|ipod/i.test(userAgent)) return 'iOS'
    if (/macintosh|mac os/i.test(userAgent)) return 'macOS'
    if (/windows nt/i.test(userAgent)) return 'Windows'
    if (/linux/i.test(userAgent)) return 'Linux'
    return 'Unknown'
  }

  // function to fetch the user's IP address from multiple APIs
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

  // function to fetch location details based on the retrieved IP address
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

  // function to load previously saved user data from local storage
  const loadCachedData = () => {
    const cachedData = localStorage.getItem('userInfo')
    return cachedData ? JSON.parse(cachedData) : null
  }

  // function that updates user system details progressively with delays
  const updateInfoStepByStep = async () => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms)) // helper function to create time delays
    const cachedData = loadCachedData()
    const isFirstLoad = !cachedData // check if it's the first time loading data

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
      setProgress(90) // Stall at 90% until hero image loads

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

      // Start a timeout of 3 seconds for fetching location
      let locationFetched = false
      const locationTimeout = setTimeout(() => {
        if (!locationFetched) {
          console.warn('Location fetch timeout exceeded, skipping...')
          setInfo((prev) => ({ ...prev, location: 'Unavailable' }))
          setStep(5)
          setProgress(90)
          setReadyToFinish(true) // Mark as ready to finish
        }
      }, 3000) // 3 seconds timeout

      if (newInfo.ip !== 'Unavailable') {
        const location = await fetchLocation(newInfo.ip)
        locationFetched = true
        clearTimeout(locationTimeout) // Clear timeout if location fetched in time
        newInfo.location = location
      } else {
        newInfo.location = 'Unavailable'
      }

      setInfo(newInfo)
      localStorage.setItem('userInfo', JSON.stringify(newInfo))

      setStep(5)
      await delay(500)
      setProgress(90)
    }

    setReadyToFinish(true)
  }

  // function to update the stored cache with new data in the background
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

    localStorage.setItem('userInfo', JSON.stringify(newInfo)) // store the latest details
  }

  // effect hook to initiate the loading sequence and handle online/offline status changes
  useEffect(() => {
    updateInfoStepByStep()

    // function to update connection status dynamically
    const updateConnectionStatus = () => {
      setInfo((prev) => ({
        ...prev,
        onlineStatus: navigator.onLine ? 'Online' : 'Offline',
      }))
    }

    // event listeners for online/offline status changes
    window.addEventListener('online', updateConnectionStatus)
    window.addEventListener('offline', updateConnectionStatus)

    // cleanup function to remove event listeners when component unmounts
    return () => {
      window.removeEventListener('online', updateConnectionStatus)
      window.removeEventListener('offline', updateConnectionStatus)
    }
  }, [])

  // effect to handle the final transition to 100% and finish
  useEffect(() => {
    if (readyToFinish && isHeroLoaded) {
      setProgress(100)
      const timer = setTimeout(onFinish, 500)
      return () => clearTimeout(timer)
    }
  }, [readyToFinish, isHeroLoaded, onFinish])

  return (
    <div className={styles.loader}>
      {!showConnectionStatus ? (
        <p>INITIALIZING SECURE HANDSHAKE...</p>
      ) : (
        <p>
          CONNECTION STATUS:{' '}
          <span
            className={
              info.onlineStatus === 'Online' ? styles.online : styles.offline
            }
          >
            {info.onlineStatus === 'Online' ? 'ESTABLISHED' : '🔴 OFFLINE'}
          </span>
        </p>
      )}
      {step >= 1 && <p>IDENTIFYING BROWSER AGENT: {info.browser.toUpperCase()}</p>}
      {step >= 2 && <p>SCANNING HOST OS: {info.os.toUpperCase()}</p>}
      {step >= 3 && <p>TARGET IP LOCKED: <span style={{color: '#fff', fontWeight: 'bold'}}>{info.ip}</span></p>}
      {step >= 4 && <p>GEOLOCATION PINPOINTED: <span style={{color: '#fff', fontWeight: 'bold'}}>{info.location === 'Unavailable' ? 'CLASSIFIED' : info.location.toUpperCase()}</span></p>}
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
