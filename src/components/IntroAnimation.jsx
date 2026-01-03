import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useMemo } from 'react'

const IntroAnimation = ({onFinish}) => {

  const greeting = useMemo(() => ["Hello", "Bonjour", "Hola", "Namaste", "Salaam"], [])

  const [index, setIndex] = React.useState(0);       // tracking which greeting to show
  const [visible, setVisible] = React.useState(true);   // to track visibility of the intro animation

  useEffect(() => {
    if(index < greeting.length - 1){
      const id = setInterval(() => setIndex((i) => i+1), 180)
      return () => clearInterval(id);
    }
    else{     // when all greetings are shown then hide the intro animation
      const t = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(t);
    }
  }, [index, greeting.length]);

  // we use AnimatePresence to handle the entry and exit animation
  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white overflow-hidden'
        initial={{ y:0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1 key={index} className='text-5xl md:text-7xl lg:text-8xl font-bold'
          initial={{ opacity: 0, y:20 }}
          animate={{ opacity: 1, y:0 }}
          exit={{ opacity: 0, y:-20 }}
          transition={{ duration: 0.12 }}
          >
            
            {greeting[index]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IntroAnimation
