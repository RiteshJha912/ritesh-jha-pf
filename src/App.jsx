import './App.css';
import Hero from './sections/Hero/hero.jsx';
import Projects from './sections/Projects/projects.jsx'
import Skills from './sections/Skills/skills.jsx'
import Contact from './sections/Contact/contact.jsx';
import Footer from './sections/Footer/footer.jsx'
import Experience from './sections/Experience/experience.jsx';

function App() {
  return (
    <>
      <Hero/>
      <Projects/>
      <Skills/>
      <Experience/>
      <Contact/>
      <Footer/>
    </>
  )
}

export default App
