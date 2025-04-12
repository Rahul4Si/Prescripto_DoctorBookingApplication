import React from 'react'
import Footer from '../components/Footer.jsx'

const About = () => {
  return (
    <>
    <div>
      <div class="text-center text-3xl pt-10 text-[#707070]">
        <p>ABOUT <span class="text-gray-700 font-semibold">US</span></p>
      </div>
      <div class="my-10 flex flex-col md:flex-row md:justify-center gap-40 mx-10">
        <img class="w-full md:max-w-[360px]" src="https://prescripto.vercel.app/assets/about_image-MG9zrc7b.png" alt="" />
        <div class="flex flex-col text-xl justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Welcome to MediConnect, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals 
            face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p> MediConnect is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user
             experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of 
             the way.
          </p>
          <b class="text-gray-800">Our Vision</b>
          <p>Our vision at MediConnect is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, 
                making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>
      <div className='text-center text-3xl pt-10 text-[#707070] mx-10'>
        <p className='py-9'>WHY  <span class="text-gray-700 font-semibold">CHOOSE US</span></p>
        <div class="flex flex-col md:flex-row mb-20 space-x-5" >
          <div class="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <b className='text-xl'>EFFICIENCY:</b>
            <p className='text-xl'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div class="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <b className='text-xl'>CONVENIENCE: </b>
            <p className='text-xl'>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div class="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <b className='text-xl'>PERSONALIZATION:</b>
            <p className='text-xl'>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default About