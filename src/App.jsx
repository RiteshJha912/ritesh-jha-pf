import { useState, useEffect, useRef, createContext, useContext } from 'react'
import Lenis from 'lenis'
import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Hero from './sections/Hero/hero.jsx'
import ProjectsTeaser from './sections/Projects/ProjectsTeaser.jsx'
import AllProjects from './pages/AllProjects/AllProjects.jsx'
import Blogs from './pages/Blogs/Blogs.jsx'

import Connect from './sections/Connect/Connect.jsx'
import Footer from './sections/Footer/footer.jsx'
import Experience from './sections/Experience/ExperienceSection.jsx'
import BentoGrid from './sections/BentoGrid/BentoGrid.jsx'
// import Github from './sections/Github/Github.jsx'
import LoadingScreen from './common/loadingScreen.jsx'
import Navbar from './sections/Navbar/Navbar.jsx'
import SEO from './common/SEO.jsx'

// Create context for Lenis
const LenisContext = createContext(null)

// ScrollToTop component that uses Lenis
function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useContext(LenisContext)

  useEffect(() => {
    // Reset Lenis scroll position
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    }
    
    // Also use native scroll methods as fallback
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    // Additional delayed attempts
    const timeouts = [
      setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(0, { immediate: true, force: true })
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }, 0),
      setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(0, { immediate: true, force: true })
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }, 100)
    ]

    return () => timeouts.forEach(clearTimeout)
  }, [pathname, lenis])

  return null
}

function App() {
  // Check session storage to see if we've already shown the loader in this session
  const [isLoaderFinished, setIsLoaderFinished] = useState(() => {
    return sessionStorage.getItem('isLoaderFinished') === 'true'
  })
  
  // If we've already loaded once, we assume hero is "loaded" enough to not block UI 
  // (browser cache usually handles this fast on refresh)
  const [isHeroLoaded, setIsHeroLoaded] = useState(() => {
    return sessionStorage.getItem('isLoaderFinished') === 'true'
  })

  // Handle loading state bypass for non-home routes
  useEffect(() => {
    if (window.location.pathname !== '/') {
      setIsHeroLoaded(true);
    }
  }, []);
  
  const showLoader = !isLoaderFinished || !isHeroLoaded

  useEffect(() => {
    if (!showLoader) {
      document.body.style.overflow = 'auto' // Allow scrolling after loading
    } else {
      document.body.style.overflow = 'hidden' // Prevent scrolling while loading
    }
  }, [showLoader])

  // Store Lenis instance in ref
  const lenisRef = useRef(null)

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      <BrowserRouter>
      {showLoader && (
        <LoadingScreen
          onFinish={() => {
            setIsLoaderFinished(true)
            sessionStorage.setItem('isLoaderFinished', 'true')
          }}
          isHeroLoaded={isHeroLoaded}
        />
      )}
      
      <ScrollToTop />
      <Navbar />
      
      <Routes>
        <Route path="/" element={
          <>
            <SEO 
              title="Ritesh Jha | Full Stack Developer | CyberSecurity Enthusiast"
              description="Ritesh Jha (Ritzardous) - Full Stack Developer & Cybersecurity Enthusiast. Expert in React, Next.js, and Security Assessment. Based in Mumbai, India."
              canonical="https://ritesh-jha.vercel.app/"
            />
            <Hero onImageLoad={() => setIsHeroLoaded(true)} isLoaded={!showLoader} />
            <div id="about">
              <BentoGrid />
            </div>
            <Experience />
            <ProjectsTeaser />
            <Connect />
            {/* <Github /> */}
          </>
        } />
        
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>

      <Footer />
    </BrowserRouter>
    </LenisContext.Provider>
  )
}

export default App
