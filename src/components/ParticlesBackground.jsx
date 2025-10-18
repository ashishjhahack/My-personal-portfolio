import React, { useEffect } from 'react'
import { useRef } from 'react'

const ParticlesBackground = () => {

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')    // give 2D context to the canvas

    let particles = [];
    const particleCount = 50;
    const colors = ["rgba(255,255,255,0.7)"];

    class Particle{
      constructor(){
        this.x = Math.random() * canvas.width;    // randomly place particles in x axis
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2+1;
      }
    }
    
  })


  return (
    <canvas ref={canvasRef} className='fixed top-0 left-0 right-0 w-full h-full pointer-events-none z-0'>

    </canvas>
  )
}

export default ParticlesBackground
