import React, { useEffect, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const experiences = [
  {
    role: 'Web Developer',
    company: '',
    duration: 'Jan 2023 - Present',
    description: 'Developed and maintained company website and web applications.'
  },
  {
    role: 'Full Stack Developer',
    company: 'TechSpark',
    duration: 'Jun 2024 - Present',
    description: 'Implemented responsive designs and improved user experience.'
  },
  {
    role: 'Software Engineer Virtual Intern',
    company: 'Walmart Global Tech',
    duration: 'Nov 2025',
    description: 'Gain knowledge about DSA and Databse.Assisted in developing various projects.'
  }
]

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const scale = useTransform(scrollYProgress, [start, end], [0, 1])       // Scale from 0 to 1
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])     // Opacity from 0 to 1

  const y = useTransform(scrollYProgress, [start, end], [idx % 2 === 0 ? 30 : -30, 0])     // Alternate direction based on index(if even, move from bottom to top; if odd, move from top to bottom)
  const x = useTransform(scrollYProgress, [start, end], [-24, 0])    // for mobile view, move from left to right

  if (layout === 'desktop') {      // desktop layout
    return (
      <div className='relative flex flex-1 justify-center items-center min-w-0'>
        <motion.div className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255, 255, 255, 0.1)]"
          style={{ scale, opacity }}>
        </motion.div>

        {/* vertical line */}
        <motion.div className={`absolute ${idx % 2 === 0 ? '-top-8' : '-bottom-8'} w-[3px] bg-white/40`}
          style={{ height: 40, opacity }}>
        </motion.div>
        <motion.article className={`absolute ${idx % 2 === 0 ? "bottom-12" : "top-12"} bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
          style={{ y, opacity, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: idx * 0.5 }}
        >
          <h3 className='text-xl font-semibold'>{exp.role}</h3>
          <p className='text-gray-400 text-md mb-3'>{exp.company} | {exp.duration}</p>
          <p className=' text-gray-300 text-md break-words'>{exp.description}</p>
        </motion.article>
      </div>
    )
  }
  return (      // mobile layout
    <div className='relative flex items-start'>
      <motion.div className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255, 255, 255, 0.1)]"
        style={{ scale, opacity }}>
      </motion.div>
      <motion.article className='bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 shadow-lg w-[99vw] max-w-sm ml-6'
        style={{ x, opacity }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <h3 className='text-lg font-semibold break-words'>{exp.role}</h3>
        <p className='text-gray-400 text-sm mb-2 break-words'>{exp.company} | {exp.duration}</p>
        <p className=' text-gray-300 text-sm break-words'>{exp.description}</p>
      </motion.article>
    </div>
  )

}

const Experience = () => {

  const sceneRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);    // we consider mobile if width <= 768px
    checkMobile();     // initial check for mobile view
    window.addEventListener('resize', checkMobile);    // update on resize
    return () => window.removeEventListener('resize', checkMobile);     // cleanup listener on unmount
  }, []);   // empty dependency array to run only once on mount

  const SCENE_HEIGHT_VH = isMobile ? 160 * experiences.length : 120 * experiences.length;   // height of the scroll scene in vh

  const { scrollYProgress } = useScroll({     // scrollYProgress gives us a value from 0 to 1 based on scroll position within the target
    target: sceneRef,
    offset: ["start start", "end end"]
  })

  const thresholds = useMemo(() => experiences.map((_, i) => (i + 1) / experiences.length), []);     // calculate thresholds for each experience item

  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`);    // line size from 0% to 100% based on scroll progress
  return (
    <section id='experience' className='relative bg-black text-white'>
      <div ref={sceneRef} className='relative'
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
      >
        <div className='sticky top-0 h-screen flex flex-col'>
          <h2 className='text-4xl sm:text-5xl font-semibold mt-11 text-center'>
            Experience
          </h2>
          <div className='flex flex-1 items-center justify-center px-6 pb-10'>
            {!isMobile && (
              <div className='relative w-full max-w-7xl'>
                {/* vertical empty timeline line */}
                <div className='relative h-[6px] bg-white/15 rounded'>
                  {/* animated filled portion of the timeline line */}
                  <motion.div className='absolute left-0 top-0 h-[6px] bg-white rounded origin-left'
                    style={{ width: lineSize }}
                  >
                  </motion.div>
                </div>
                {/* Experience items for desktop */}
                <div className='relative flex justify-between mt-0'>
                  {experiences.map((exp, idx) => (
                    <ExperienceItem key={idx} exp={exp} idx={idx} start={idx === 0 ? 0 : thresholds[idx-1]} end={thresholds[idx]} scrollYProgress={scrollYProgress} layout={'desktop'}/>
                  ))}
                </div>
              </div>
            )}

            {isMobile && (
              <div className='relative w-full max-w-md'>
                <div className='absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded'>
                  <motion.div className='absolute top-0 left-0 w-[6px] bg-white rounded origin-top'
                    style={{ height: lineSize }}
                  ></motion.div>
                </div>
                <div className='relative flex flex-col gap-10 ml-10 mt-6 mb-28'>
                  {experiences.map((exp, idx) => (
                    <ExperienceItem key={idx} exp={exp} idx={idx} start={idx === 0 ? 0 : thresholds[idx-1]} end={thresholds[idx]} scrollYProgress={scrollYProgress} layout={'mobile'}/>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
