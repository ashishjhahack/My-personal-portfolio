import React, { useEffect, useMemo } from 'react'
import img1 from '../assets/img1.JPG'
import img2 from '../assets/img2.JPG'
import img3 from '../assets/img3.JPG'
import photo1 from '../assets/photo1.JPG'
import photo2 from '../assets/photo2.PNG'
import photo3 from '../assets/photo3.png'
import { AnimatePresence, motion } from 'framer-motion'
import { useScroll, useMotionValueEvent } from 'framer-motion'



const useIsMobile = (query = '(max-width: 639px)') => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' && window.matchMedia(query).matches   // window == undefined during SSR(means in nextJs). So, this code is for both SSR and CSR.
  );
  useEffect(() => {     // this useEffect will run only on client side
    if(typeof window === 'undefined') return; // for SSR

    const mql  = window.matchMedia(query);
    const handleResize = (e) => setIsMobile(e.matches);     // whenever the media query match state changes, this function will be called.

    mql.addEventListener('change', handleResize);  // listen for changes to the media query match state
    setIsMobile(mql.matches);  // set the initial state(first time)

    return () => mql.removeEventListener('change', handleResize); // cleanup function to remove the event listener when the component unmounts
  }, [query])

  return isMobile;
}
const Projects = () => {
  const isMobile = useIsMobile();
  const sceneRef = React.useRef(null);

  const projects = useMemo(() => [
    {
      title: "nk studio",
      link: "https://www.nk.studio/",
      bgColor: "#0d4d3d",
      image: isMobile ? photo1 : img1,      // use mobile and desktop images accordingly
    },
    {
      title: "Gamily",
      link: "https://gamily.app/",
      bgColor: "#3384d3",
      image: isMobile ? photo2 : img2,
    },
    {
      title: "Hungry Tiger",
      link: "https://www.eathungrytiger.com/",
      bgColor: "dc9317",
      image: isMobile ? photo3 : img3
    }
  ], [isMobile]);     // re-run only when isMobile changes

  const {scrollYProgress} = useScroll({             // to track the scroll progress of the section
    target: sceneRef,           
    offset: ["start start", "end end"]       // when the top of the target hits the top of the viewport to when the bottom of the target hits the bottom of the viewport
  });

  const thresholds = projects.map((_, index) => (index+1) / projects.length); // calculate thresholds based on number of projects; eg (0 + 1)/3 = 0.33 or (1+1)/3 = 0.66

  const [activeIndex, setActiveIndex] = React.useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((threshold) => v < threshold);
    setActiveIndex(idx === -1 ? projects.length - 1 : idx);    // if no threshold is found, set to last index(project)
  })

  const activeProject = projects[activeIndex];

  return (
    <section id='projects' ref={sceneRef} style={{height: `${100*projects.length}vh`, backgroundColor: activeProject.bgColor, transition: 'background-color 400ms ease'}} className='relative text-white'> 
      <div className='sticky top-0 h-screen flex flex-col items-center justify-center'>
        <h2 className={`text-3xl font-semibold z-10 text-center ${isMobile ? 'mt-4' : 'mt-8'}`}>
          My Work
        </h2>
        <div className={`relative w-full flex-1 flex items-center justify-center ${isMobile ? '-mt-4' : ''}`}>
          {projects.map((project, index) => (
            <div key={project.title}
             className={`absolute top-1/2 left-1/2 -translate-x-0.5 -translate-y-0.5 transition-all duration-500 ${activeIndex === index ? 'opacity-100 z-20' : 'opacity-0 z-0 sm:z-10'}`}
             style={{width: '85%', maxWidth: "1200px"}}>
              <AnimatePresence mode='wait'>
                {activeIndex === index &&  (
                  <motion.h3 key={project.title}
                  initial={{opacity: 0, y: -30}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: 30}}
                  transition={{duration: 0.5, ease: "easeOut"}}
                  className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:-top-20 sm:left-[35%] lg:left-[-5%] sm:mb-0 italic font-semibold ${isMobile ? '-mt-24' : ''}`}
                  style={{
                    zIndex: 5,
                    textAlign: isMobile ? 'center' : 'left',
                  }}>
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>

              <div className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${isMobile ? 'mb-6 rounded-lg' : 'mb-10 sm:mb-12 rounded-xl'} h-[62vh] sm:h-[66vh]`}
              style={{
                zIndex: 10,
                transition: "box-shadow 250ms ease"
              }}>
                <img src={project.image} alt={project.title} className='w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl'
                style={{
                  position: 'relative',
                  zIndex: 10,
                  filter: 'drop-shadow(0,16px 40px rgba(0,0,0,0.65))',
                  transition: 'filter 200ms ease',
                }} 
                loading='lazy'/>
              </div>
            </div>
          ))}
        </div>

        {/* button */}
        <div className={`absolute ${isMobile ? 'bottom-20' : 'bottom-10'}`}>
          <a href={activeProject?.link} target="_blank" rel="noopener noreferrer"
          className={`inline-block px-6 py-3 font-semibold text-black bg-white rounded-lg shadow-md hover:bg-gray-200 transition-all duration-200`}
          aria-label={`View project: ${activeProject?.title}`}
          >
            View Project
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
