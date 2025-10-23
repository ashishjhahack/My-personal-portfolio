import React, {useEffect, useState, useMemo } from 'react'
import ParticlesBackground from '../components/ParticlesBackground'
import { motion, scale } from 'framer-motion'
import { FaXTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa6'
import avatar from '../assets/avator.png'


const socials = [
  { Icon: FaXTwitter, label: 'X', href: 'https://twitter.com/yourprofile' },
  { Icon: FaLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/ashish-jha-41227234b' },
  { Icon: FaGithub, label: 'GitHub', href: 'https://github.com/ashishjhahack' },
  { Icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com/ashish.j5_04' }
]

const glowVariants = {
  initial: {scale: 1, y:0, filter: "drop-shadow(0 0 0 rgba(0, 0, 0, 0))"},
  hover: {
    scale: 1.2, y:-3,
    filter: "drop-shadow(0 0 8px rgba(13, 88, 204, 0.9)) drop-shadow(0 0 18px rgba(16, 185, 129, 0.8))", 
    transition: {type: 'spring', stiffness: 300, damping: 15}
  },
  tap: {scale: 0.9, y:0, transition: {duration: 0.08}}
}

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
    <section id='home' className='w-full h-screen relative bg-black overflow-hidden pt-20'>
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

            {/* social icons  */}
            <div className='mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start'>
              {socials.map(({Icon, label, href}) => (
                <motion.a href={href} target="_blank" key={label} aria-label={label} rel='noopener noreferrer' variants={glowVariants} initial="initial" whileHover="hover" whileTap="tap" className='text-gray-300 hover:text-white transition-colors duration-300'>
                  <Icon />
                </motion.a>
              ))}
            </div>

          </div>
        </div>

        {/*right side - add image*/}
        <div className='relative hidden lg:block'>

          {/* Glow Effect */}
          <div 
          className='absolute top-0.5 -translate-y-0.5 pointer-events-none'
          style={{
            right: "10px", width: 'min(22vw, 410px)', height: "min(40vh, 760px)", borderRadius: "50%",
            filter: "blur(38px)", opacity: 0.32,
            background: "conic-gradient(from 0deg, #1cd8d2, #00bf8f, #302b63, #1cd8d2)"
            
          }}
          />

          <motion.img src={avatar} alt="Ashish Jha"
          className='absolute top-0.5 -translate-y-1/2 object-contain select-none pointer-events-none'
          style={{
            right: "-30px", width: "min(45vw, 780px)", maxHeight: "90vh", top: "290px"
          }}
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
           />
        </div>

      </div>
    </section>
  )
}

export default Home
