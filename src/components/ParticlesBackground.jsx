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
        this.size = Math.random() * 2+1;     // random size between 
        this.color = colors[Math.floor(Math.random() * colors.length)];   // traverse color array
        this.speedX = (Math.random() - 0.5) * 0.5;   // control particle speed in x
        this.speedY = (Math.random() - 0.5) * 0.5;
      
      }

      draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);   // draw circle
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();    // paint the particles in the canvas
      }

      update(){
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x < 0){        // if particle goes out of canvas then reset it to starting from other side
          this.x = canvas.width;
        }
        if(this.x > canvas.width){
          this.x = 0;
        }
        if(this.y < 0){
          this.y = canvas.height;
        }
        if(this.y > canvas.height){
          this.y = 0;
        }
        this.draw();     // darw the particles in new position
      }
    }

    function createParticles(){
      particles = []; 
      for(let i = 0; i < particleCount; i++){
        particles.push(new Particle());
      }
    }

    function handleResize(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();       // recreates the particle whenever size is changes
    }
    handleResize();
    window.addEventListener('resize', handleResize);

    let animationId;
    function animate(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);    // clear the canvas when particles are moved 
      particles.forEach((p) => p.update())
      animationId = requestAnimationFrame(animate);
    }
    animate();      // start the animation in loop


    return () => {
      cancelAnimationFrame(animationId);       // cancel the animation when component unmounts
      window.removeEventListener('resize', handleResize);
    }
  }, [])


  return (
    <canvas ref={canvasRef} className='fixed top-0 left-0 right-0 w-full h-full pointer-events-none z-0'>

    </canvas>
  )
}

export default ParticlesBackground
