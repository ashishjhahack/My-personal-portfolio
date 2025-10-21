import React, { useState, useRef, useEffect } from 'react'
import OverlayMenu from './OverlayMenu'
import Logo from '../assets/Logo.png'
import {FiMenu} from 'react-icons/fi'


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);

  const lastScrollY = useRef(0);
  const timerId = useRef(null);

  useEffect(() => {
    const homeSection = document.querySelector('home');
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {        // when home section is visible then visible the nav bar
          setVisible(true);
          setForceVisible(true);
        } else {
          setForceVisible(false);
        }
      },
      { threshold: 0.1 }       // atleast 10% home page visible
    );

    if (homeSection) observer.observe(homeSection);

    return () => {          // cleanup function
      if (homeSection) observer.unobserve(homeSection);
    };

  }, []);

  useEffect(() => {
    const handleScroll = () => {
    if(forceVisible){
      setVisible(true);
      return;
    }
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY.current) {   // means when we scroll down
      setVisible(false);
    } else {
      setVisible(true);
      if(timerId.current){
        clearTimeout(timerId.current);
      }
      timerId.current = setTimeout(() => {     // means it will hide after 3 sec
        setVisible(false);
      }, 500);
    }
    lastScrollY.current = currentScrollY

    }

    window.addEventListener('scroll', handleScroll, {passive: true});

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [forceVisible])    // re-run whenever force visible is changed

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}}`}>
        {/* logo  */}
        <div className='flex items-center space-x-2'>
          <img src={Logo} alt="logo" className='w-8 h-8' />
          <div className='text-2xl font-bold text-white hidden sm:block'>Ashish.</div>
        </div>

        {/* menu bar */}
        <div className='block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2'>
          <button onClick={() => setMenuOpen(true)} className='text-white text-3xl focus:outline-none' aria-label='open-menu'>
            <FiMenu />
          </button>
        </div>

        {/* navigation links :- it hidden for other screens and only visible for large screen */}
        <div className='hidden lg:block'>
          <a href="#contact" className='bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300'>
            Reach Out
          </a>

        </div>
      </nav>
      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

export default Navbar
