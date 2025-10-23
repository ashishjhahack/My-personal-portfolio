import React, {useEffect, useState, useMemo } from 'react'
import ParticlesBackground from '../components/ParticlesBackground'
import { motion } from 'framer-motion'
import { FaXTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa6'


const socials = [
  { Icon: FaXTwitter, link: 'https://twitter.com/yourprofile' },
  { Icon: FaLinkedin, link: 'https://linkedin.com/in/ashish-jha-41227234b' },
  { Icon: FaGithub, link: 'https://github.com/ashishjhahack' },
  { Icon: FaInstagram, link: 'https://instagram.com/ashish.j5_04' }
]

const Home = () => {

  // useMemo hook to memoize the roles array
  const roles = useMemo(() => ["Full Stack Developer", "Web Developer", "Tech Enthusiast"], [])
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
     const current = roles[index];     // Set the current role based on index
     const timeout = setTimeout(() => {
      if(!deleting && subIndex < current.length){        // if the word is not full completed means less than a complete current word
        setSubIndex(v => v + 1);     // then add next character to the current word
      }
      else if(!deleting && subIndex === current.length){   // if the word is fully completed
        setTimeout(() => setDeleting(true), 1200);   // wait for some second and then start deleting
      }
      else if(deleting && subIndex > 0){    // if we are in deleting mode and still some character is left
        setSubIndex(v => v - 1);    // delete character one by one
      } 
      else if(deleting && subIndex === 0){   // if all character are deleted
        setDeleting(false);
        setIndex((prev) => (prev + 1) % roles.length);   // move to next word in the roles array
      }
     }, deleting ? 40 : 60);   // speed of deleting and adding character

     return () => clearTimeout(timeout);   // cleanup timeout on unmount or before next effect run
  }, [subIndex, index, deleting, roles]);

  return (
    <section id='home' className='w-full h-screen relative bg-black overflow-hidden'>
      <ParticlesBackground />

      {/* background animation  */}
      <div className='absolute inset-0'>
        {/*2 background effects*/}
        <div
         className='absolute -top-32 -left-32 
         w-[70vw] sm:w-[z-500vw] md:w-[40vw] 
         h-[70vw] sm:h-[50vw] md:h-[40vw] 
         max-w-500px max-h-500px 
         rounded-full 
         bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] 
         opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] 
         sm:blur-[130px] md:blur-[150px] 
         animate-pulse'></div>
        <div className='absolute bottom-0 right-0 
         w-[70vw] sm:w-[z-500vw] md:w-[40vw] 
         h-[70vw] sm:h-[50vw] md:h-[40vw] 
         max-w-500px max-h-500px 
         rounded-full 
         bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] 
         opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] 
         sm:blur-[130px] md:blur-[150px] 
         animate-pulse delay-500'></div>
      </div>

      <div className='relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2'>      {/*for large screen it have 2 columns left or right*/ }
        {/*left side */}
        <div className='flex flex-col justify-center h-full text-center lg:text-left relative'>
          <div className='w-full lg:pr-24 mx-auto max-w-[48rem]'>
            {/* Type writter effect */}
            <motion.div 
            className='mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]'
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>
              <span className='inline-block w-[2px] ml-1 bg-white animate-pulse align-middle' style={{height: "1em"}}></span>      {/* line */}
            </motion.div>
            <motion.h1 
            className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text
            bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] drop-shadow-lg leading-tight'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1}}>
              Hello I'm<br />
              <span className='text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap'>Ashish Jha</span>
            </motion.h1>
            <motion.p className='mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 , delay: 0.4}}>
              Full Stack Developer with 2+ years of experience designing, developing, and deploying scalable web applications with AI features. Proficient in the MERN stack with strong expertise in RESTful APIs, responsive UI design, and database optimization
            </motion.p>

            <motion.div className='mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-lg sm:text-xl font-medium'
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 0.8 , delay: 0.8}}>
              <a href="#projects" 
              className='px-6 py-3 rounded-full font-medium text-lg text-white bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] shadow-lg hover:scale-105 transition-all'>View My Work</a>
              <a href="/Ashish-Resume.pdf"
              download 
              className='px-6 py-3 rounded-full text-lg font-medium text-black bg-white hover:bg-gray-200 shadow-lg hover:scale-105 transition-all'>My Resume</a>
            </motion.div>

            <div className='mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start'>
              
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Home
