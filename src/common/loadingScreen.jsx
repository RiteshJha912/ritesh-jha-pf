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

  // Enhanced function to fetch the user's IP address with multiple strategies
  const fetchIP = async () => {
    // Primary IP APIs with different response formats
    const ipApis = [
      { url: 'https://api64.ipify.org?format=json', parser: (data) => data.ip },
      { url: 'https://api.ipify.org?format=json', parser: (data) => data.ip },
      { url: 'https://checkip.amazonaws.com', parser: (text) => text.trim(), isText: true },
      { url: 'https://api.myip.com', parser: (data) => data.ip },
      { url: 'https://ipinfo.io/json', parser: (data) => data.ip },
      { url: 'https://ipapi.co/json', parser: (data) => data.ip },
      { url: 'https://www.cloudflare.com/cdn-cgi/trace', parser: parseCloudflareTrace, isText: true },
      { url: 'https://icanhazip.com', parser: (text) => text.trim(), isText: true },
      { url: 'https://ident.me', parser: (text) => text.trim(), isText: true },
    ]

    // Try WebRTC as a fallback method (can detect local and public IPs)
    const webRTCIP = await getIPFromWebRTC()
    if (webRTCIP && isValidIP(webRTCIP)) {
      return webRTCIP
    }

    // Try all APIs in parallel for fastest response
    const promises = ipApis.map(api => 
      fetchWithTimeout(api.url, 3000)
        .then(response => api.isText ? response.text() : response.json())
        .then(data => {
          const ip = api.parser(data)
          return isValidIP(ip) ? ip : null
        })
        .catch(() => null)
    )

    const results = await Promise.allSettled(promises)
    
    // Return the first valid IP found
    for (const result of results) {
      if (result.status === 'fulfilled' && result.value) {
        return result.value
      }
    }

    // If all else fails, try sequential fallback
    for (let api of ipApis) {
      try {
        const response = await fetchWithTimeout(api.url, 4000)
        const data = api.isText ? await response.text() : await response.json()
        const ip = api.parser(data)
        if (isValidIP(ip)) return ip
      } catch (error) {
        console.warn(`Failed to fetch IP from ${api.url}`)
      }
    }

    return 'Unavailable'
  }

  // Helper function to parse Cloudflare trace response
  function parseCloudflareTrace(text) {
    const lines = text.split('\n')
    const ipLine = lines.find(line => line.startsWith('ip='))
    return ipLine ? ipLine.split('=')[1] : null
  }

  // Helper function to validate IP address format
  function isValidIP(ip) {
    if (!ip || typeof ip !== 'string') return false
    
    // IPv4 validation
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
    if (ipv4Regex.test(ip)) {
      const parts = ip.split('.')
      return parts.every(part => {
        const num = parseInt(part, 10)
        return num >= 0 && num <= 255
      })
    }
    
    // IPv6 validation (basic)
    const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/
    return ipv6Regex.test(ip)
  }

  // WebRTC-based IP detection as fallback
  async function getIPFromWebRTC() {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => resolve(null), 2000)
      
      try {
        const pc = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        })
        
        pc.createDataChannel('')
        
        pc.onicecandidate = (ice) => {
          if (!ice || !ice.candidate || !ice.candidate.candidate) return
          
          const candidateStr = ice.candidate.candidate
          const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
          const match = candidateStr.match(ipRegex)
          
          if (match && match[1]) {
            const ip = match[1]
            // Filter out local IPs
            if (!ip.startsWith('192.168.') && 
                !ip.startsWith('10.') && 
                !ip.startsWith('172.') &&
                !ip.startsWith('127.') &&
                ip !== '0.0.0.0') {
              clearTimeout(timeout)
              pc.close()
              resolve(ip)
            }
          }
        }
        
        pc.createOffer()
          .then(offer => pc.setLocalDescription(offer))
          .catch(() => {
            clearTimeout(timeout)
            resolve(null)
          })
      } catch (error) {
        clearTimeout(timeout)
        resolve(null)
      }
    })
  }

  // Fetch with timeout wrapper
  function fetchWithTimeout(url, timeout = 3000) {
    return Promise.race([
      fetch(url),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), timeout)
      )
    ])
  }

  // function to load previously saved user data from local storage
  const loadCachedData = () => {
    const cachedData = localStorage.getItem('userInfo')
    if (!cachedData) return null
    
    try {
      const parsed = JSON.parse(cachedData)
      const cacheTime = localStorage.getItem('userInfoTimestamp')
      const now = Date.now()
      
      // Cache expires after 1 hour
      if (cacheTime && (now - parseInt(cacheTime)) < 3600000) {
        return parsed
      }
      return null
    } catch {
      return null
    }
  }

  // function that updates user system details progressively with delays
  const updateInfoStepByStep = async () => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms))
    const cachedData = loadCachedData()
    const isFirstLoad = !cachedData

    await delay(isFirstLoad ? 1500 : 750)
    setShowConnectionStatus(true)
    setProgress(20)

    setStep(1)
    await delay(isFirstLoad ? 1000 : 500)
    setProgress(40)

    if (cachedData) {
      setInfo(cachedData)
      setStep(2)
      await delay(250)
      setProgress(60)
      setStep(3)
      await delay(250)
      setProgress(80)
      setStep(4)
      await delay(250)
      setProgress(90)

      updateCacheInBackground()
    } else {
      const newInfo = {
        onlineStatus: navigator.onLine ? 'Online' : 'Offline',
        browser: getBrowser(),
        os: getOS(),
        ip: 'Fetching...',
      }

      setInfo((prev) => ({ ...prev, browser: newInfo.browser }))
      setStep(2)
      await delay(1000)
      setProgress(60)

      setInfo((prev) => ({ ...prev, os: newInfo.os }))
      setStep(3)
      await delay(1000)
      setProgress(80)

      // Fetch IP with enhanced logic
      newInfo.ip = await fetchIP()
      setInfo((prev) => ({ ...prev, ip: newInfo.ip }))
      
      // Save to cache with timestamp
      localStorage.setItem('userInfo', JSON.stringify(newInfo))
      localStorage.setItem('userInfoTimestamp', Date.now().toString())

      setStep(4)
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
    }

    localStorage.setItem('userInfo', JSON.stringify(newInfo))
    localStorage.setItem('userInfoTimestamp', Date.now().toString())
  }

  // effect hook to initiate the loading sequence and handle online/offline status changes
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
        <p className={styles.mainText}>Connecting...</p>
      ) : (
        <p className={styles.mainText}>
          Status:{' '}
          <span
            className={
              info.onlineStatus === 'Online' ? styles.online : styles.offline
            }
          >
            {info.onlineStatus === 'Online' ? 'Connected' : 'Offline'}
          </span>
        </p>
      )}
      {step >= 1 && <p className={styles.infoText}>Browser: <span className={styles.value}>{info.browser}</span></p>}
      {step >= 2 && <p className={styles.infoText}>System: <span className={styles.value}>{info.os}</span></p>}
      {step >= 3 && <p className={styles.infoText}>IP Address: <span className={styles.highlight}>{info.ip}</span></p>}

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