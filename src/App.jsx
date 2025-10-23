import React from 'react'
import Navbar from './components/Navbar'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import Home from './sections/Home'
import ParticlesBackground from './components/ParticlesBackground'
import CustomCursor from './components/CustomCursor'

const App = () => {
  return (
    <div className='relative gradient text-white'>
      <CustomCursor />
      {/* <ParticlesBackground /> */}
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
