import React from 'react'
import { motion } from 'framer-motion'
import boy from '../assets/boy.jpg'


const About = () => {

  const stats = [
    {label: 'Experience', value: '2+ Years'},
    {label: 'Speciality', value: 'Full Stack Development'},
    {label: 'Focus', value: 'Scalable Web Apps with AI Features'},
  ]

  const glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-0 right-10 w-[420px] h-[360px] opacity-15 blur-[140px] delay-300",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-15 blur-[100px] delay-500",
  ]

  return (
    <section id="about" className='w-full h-screen flex items-center justify-center relative bg-black overflow-hidden text-white'>
      {/* glows background effect*/}
      <div className='absolute inset-0 pointer-events-none'>
        {glows.map((c, i) => (
          <div key={i} className={`absolute ${c} rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse`}></div>
        ))}
      </div>

      <div className='relative z-10 max:w-6xl w-full mx-auto px-6 md:px-10 lg:px-60 py-20 flex flex-col gap-12'>
        <motion.div className='flex flex-col md:flex-row items-center md:items-start gap-8'
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewPort={{ once: true, amount: 0.4 }}>        {/* means animation will run only once when 40% of the component is in view */}
          <motion.div className='relative w-160px h-160px md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1cd8d2]/20 to-[#302b63]/20 border border-[#1cd8d2]/20'
          whileHover={{scale: 1.02}}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}>
            <img className='absolute inset-0' src={boy} alt="profile" />
          </motion.div>

          <div className='flex flex-1 flex-col justify-center text-center md:text-left'>
            <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2]'>     {/* Tracking tight to reduce space between letters */}
              Ashish Jha
            </h2>
            <p className='mt-2 text-lg sm:text-xl text-white/90 font-semibold'>Full Stack Developer</p>
            <p className='mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl'>I build scalable web applications with AI features. I'm passionate about creating intuitive and efficient solutions that solve real-world problems. My expertise spans across the MERN stack, with a strong focus on building robust RESTful APIs, crafting responsive user interfaces, and optimizing database performance. I thrive on challenges and continuously seek to learn and implement new technologies to deliver cutting-edge web experiences.
            </p> 

            <div className='mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl'>
              {stats.map((stat, i) => (
                <motion.div key={i} className='rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center'
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewPort={{ once: true, amount: 0.6 }}>
                  <div className='text-sm text-gray-400'>{stat.label}</div>
                  <div className='font-semibold text-base'>{stat.value}</div>
                </motion.div>
              ))}
            </div>

            <div className='mt-6 flex flex-col sm:flex-row sm:gap-4 justify-center md:justify-start'>
              <a href="#projects" className='inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition'>View Projects</a>
              <a href="#contact" className='inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white px-5 py-3 hover:bg-white/20 transition'>Get in Touch</a>
            </div>
          </div>
        </motion.div>

        <motion.div className='text-center md:text-left'
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewPort={{ once: true, amount: 0.4 }}>
            <h3 className='text-2xl sm:text-3xl font-bold text-white mb-3'>
              About Me
            </h3>
            <p className='text-gray-300 leading-relaxed text-base font-semibold sm:text-lg'>I'm a Full Stack Developer with 2+ years of experience designing, developing, and deploying scalable web applications with AI features.</p>
            <p className='mt-4 text-gray-400 text-base sm:text-lg'>My journey in tech began with a passion for problem-solving and a curiosity for how things work. Over the years, I've honed my skills in various programming languages and frameworks, allowing me to tackle complex challenges and deliver high-quality solutions.</p>
        </motion.div>

      </div>
    </section>
  )
}

export default About
