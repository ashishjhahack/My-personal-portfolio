import React, { useEffect } from 'react'
import { FaReact, FaJava } from 'react-icons/fa6'
import { SiTypescript, SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiExpress, SiMongodb, SiNextdotjs, SiDocker, SiKubernetes } from 'react-icons/si'
import { DiNodejsSmall } from 'react-icons/di'
import { motion, useMotionValue } from 'framer-motion'

const Skills = () => {

  const skills = [
    { icon: <FaJava />, name: 'Java' },
    { icon: <FaReact />, name: 'React' },
    { icon: <SiTypescript />, name: 'TypeScript' },
    { icon: <SiJavascript />, name: 'JavaScript' },
    { icon: <SiHtml5 />, name: 'HTML5' },
    { icon: <SiCss3 />, name: 'CSS3' },
    { icon: <SiTailwindcss />, name: 'Tailwind CSS' },
    { icon: <SiExpress />, name: 'Express.js' },
    { icon: <SiMongodb />, name: 'MongoDB' },
    { icon: <SiNextdotjs />, name: 'Next.js' },
    { icon: <SiDocker />, name: 'Docker' },
    { icon: <SiKubernetes />, name: 'Kubernetes' },
    { icon: <DiNodejsSmall />, name: 'Node.js' },
  ]

  const repeated = [...skills, ...skills]  // repeat skills to create scrolling effect

  const [dir, setDir] = React.useState(-1); // -1 for right to left
  const [active, setActive] = React.useState(false);
  const sectionRef = React.useRef(null);    // to reference the skills section
  const trackRef = React.useRef(null);     // to reference the skills track
  const touchY = React.useRef(null);    // to store initial touch Y position
  const x = useMotionValue(0);   // motion value for x position, it provides smooth animation


  useEffect(() => {        // this useEffect sets up the intersection observer to detect when the section is in the viewport. it checks if at least 10% of the section is visible 

    const el = sectionRef.current;
    if (!el) return;        // if no element, exit

    const io = new IntersectionObserver(([entry]) => {    // if section is in viewport
      setActive(entry.isIntersecting && entry.intersectionRatio >= 0.1);       // set active state
    },
      { threshold: [0.1] }
    )
    io.observe(el);    // observe the section element

    return () => {
      io.disconnect()   // cleanup observer on unmount
    }
  }, [])


  useEffect(() => {     // update animation based on active state and direction
    if (!active) return;   // if not active, exit

    const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1);   // when Y is greater then 0, scroll right to left else left to right
    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);   // store the first touch Y position
    const onTouchMove = (e) => {
      if(touchY.current === null) return;   // if no initial touch, exit
      const deltaY = e.touches[0].clientY - touchY.current;   // calculate the change in Y position
      setDir(deltaY > 0 ? 1 : -1);   // set direction based on touch movement
      touchY.current = e.touches[0].clientY;   // update the touch Y position
    }
    window.addEventListener('wheel', onWheel, { passive: true });   // listen for wheel events
    window.addEventListener('touchstart', onTouchStart, { passive: true });   // listen for touch start events
    window.addEventListener('touchmove', onTouchMove, { passive: true });   // listen for touch move events

    return () => {   // cleanup event listeners on unmount or when dependencies change
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    }
  }, [active]);


  useEffect(() => {       // animate the skills track based on direction and active state. It is main useEffect for animation
    let frameId;
    let last = performance.now();     // store the last frame time
    const speed = 80;   // speed of animation

    const tick = (now) => {
      const dt = (now - last) / 1000;   // calculate delta time
      last = now;      // update last frame time when one frame is move to next then last changes to now
      let next = x.get() + dir * speed * dt;   // calculate next x position based on direction and speed;  distance = speed * time

      const loop = trackRef.current?.scrollWidth/2 || 0;   // calculate half the scroll width for looping
      if(loop) {
        if (next <= -loop) next += loop;   // if next position is less than negative loop, wrap around to right
        if (next >= 0) next -= loop;   // if next position is greater than 0, wrap around to left
      }
      x.set(next);   // update the motion value
      frameId = requestAnimationFrame(tick);   // request next animation frame
    }
    frameId = requestAnimationFrame(tick);   // start the animation

    return () => cancelAnimationFrame(frameId);   // cleanup animation frame on unmount or when dependencies change
  }, [dir, active, x]);


  return (
    <section id='skills' ref={sectionRef} className='h-1/2 w-full flex flex-col pb-8 items-center justify-center relative bg-black text-white overflow-hidden'>
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
        opacity-20 blur-[120px] animate-pulse'/>
        <div className='absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
        opacity-20 blur-[120px] animate-pulse delay-500'/>
      </div>

      <motion.h2 className='text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10'
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}>
        My Skills
      </motion.h2>

      <motion.p className='mt-2 mb-8 text-white/90 text-base z-10 sm:text-lg'
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}>
        Mordern Applications | Modern Technologies
      </motion.p>

      <div className='relative w-full overflow-hidden'>
        <motion.div ref={trackRef} style={{x, whiteSpace: "nowrap", willChange: "transform"}} className='flex gap-10 text-6xl text-[#1cd8d2]'>
          {repeated.map((skill, index) => (
            <motion.div key={index} className='flex flex-col items-center min-w-[120px] gap-2' aria-label={skill.name} title={skill.name}>
              <span className='hover:scale-125 transition-transform duration-300'>{skill.icon}</span>
              <p className='text-sm'>{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}

export default Skills
