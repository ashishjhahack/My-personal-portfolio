import React, { useState } from 'react'
import ParticlesBackground from '../components/ParticlesBackground'
import emailjs from '@emailjs/browser';
import Astra from '../assets/Astra.png'
import { easeInOut, motion } from 'framer-motion'


const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    services: '',
    budget: '',
    message: ''
  })

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'budget' && value && !/^\d+$/.test(value)) return;
    // setFormData({ ...formData, [name]: value });
    setFormData((p) => ({ ...p, [name]: value }));     // functional update form

    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validateForm = () => {     // it will validate the form fields and check if they are filled correctly
    const required = ['name', 'email', 'services', 'message'];
    const newErrors = {};     // Object to hold error messages

    required.forEach((f) => !formData[f].trim() && (newErrors[f] = 'This field is required.'));     // Check required fields

    if (formData.services !== 'other' && !formData.budget.trim())     // Check budget if services is not 'other'
      newErrors.budget = 'Fill this field';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;     // If validation fails, do not proceed
    setStatus('Sending...');     // else, set status to sending

    try {
      await emailjs.send(      // send email using emailjs
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name: formData.name,
          reply_to: formData.email
        }, PUBLIC_KEY
      );
      setStatus('success');
      setFormData({       // Reset form data
        name: '',
        email: '',
        services: '',
        budget: '',
        message: ''
      });
    }
    catch (error) {
      setStatus('error');
      console.error('EmailJS Error:', error);
    }
  }


  return (
    <section id='contact' className='w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10'>
      <ParticlesBackground />

      <div className='relative z-10 w-full flex flex-col md:flex-row items-center gap-10'>
        {/* Left side */}
        <motion.div className='w-full md:w-1/2 flex justify-center'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img src={Astra} alt="Contact" className='w-72 md:w-140 rounded-2xl shadow-lg object-cover'
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          />

        </motion.div>

        {/* Right side - Form */}
        <motion.div className='w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10'
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-3xl font-bold mb-6'>
            Let's Work Together
          </h2>
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <label className='mb-1'>Your Name <span className='text-red-500'>*</span></label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className={`p-3 rounded-md bg-white/10 border ${errors.name ? 'border-red-500' : 'border-gray-500'} text-white focus:outline-none focus:border-blue-500`} />
              {errors.name && <p className='text-red-500 text-xs'>{errors.name}</p>}
            </div>
            <div className='flex flex-col'>
              <label className='mb-1'>Your Email <span className='text-red-500'>*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={`p-3 rounded-md bg-white/10 border ${errors.email ? 'border-red-500' : 'border-gray-500'} text-white focus:outline-none focus:border-blue-500`} />
              {errors.email && <p className='text-red-500 text-xs'>{errors.email}</p>}
            </div>
            <div className='flex flex-col'>
              <label className='mb-1'>Services Needed <span className='text-red-500'>*</span></label>
              <select name="services" value={formData.services} onChange={handleChange} className={`p-3 rounded-md bg-white/10 border ${errors.services ? 'border-red-500' : 'border-gray-500'} text-white focus:outline-none focus:border-blue-500`}>
                <option value="" className='text-black' disabled>Select a service</option>
                <option value="frontend-design" className='text-black'>Frontend Design</option>
                <option value="backend-development" className='text-black'>Backend Development</option>
                <option value="full-stack-development" className='text-black'>Full Stack Development</option>
                <option value="other" className='text-black'>Others</option>
              </select>
              {errors.services && <p className='text-red-500 text-xs'>{errors.services}</p>}
            </div>
            {formData.services && formData.services !== 'other' && (
              <div className='flex flex-col'>
                <label className='mb-1'>Estimated Budget<span className='text-red-500'>*</span></label>
                <input type="text" name='budget' placeholder='Your Budget' onChange={handleChange} value={formData.budget} className={`p-3 rounded-md bg-white/10 border ${errors.budget ? 'border-red-500' : 'border-gray-500'} text-white focus:outline-none focus:border-blue-500`} />
                {errors.budget && <p className='text-red-500 text-xs'>{errors.budget}</p>}
              </div>
            )}
            <div className='flex flex-col'>
              <label className='mb-1'>Explain Your Idea<span className='text-red-500'>*</span></label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="5" className={`p-3 rounded-md bg-white/10 border ${errors.message ? 'border-red-500' : 'border-gray-500'} text-white focus:outline-none focus:border-blue-500`} />
              {errors.message && <p className='text-red-500 text-xs'>{errors.message}</p>}
            </div>
            {status && (
              <p className={`text-sm ${status === 'success' ? 'text-green-500' : status ===  'error' ? 'text-red-500' : 'text-yellow-400'}`}>
                {status === 'sending' ? "sending..." : status === 'success' ? "Message sent successfully! ✅" : "Something went wrong ❌"}
              </p>
            )}

            <motion.button className='bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-md font-semibold transition'
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            disabled={status === 'sending'}
            type="submit"
            >
              {status === 'sending' ? "Sending..." : "Send Message"}

            </motion.button>
          </form>
        </motion.div>
      </div>

    </section>
  )
}

export default Contact
