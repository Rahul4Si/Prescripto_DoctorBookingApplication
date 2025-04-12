
import React from 'react'
import Footer from '../components/Footer.jsx'

const Contact = () => {
  return (
    <>
    <div>
      <div class="text-center text-3xl pt-10 text-[#707070]">
        <p>Contact <span class="text-gray-700 font-semibold">US</span></p>
      </div>
      <div class="my-10 flex flex-col md:flex-row md:justify-center gap-40 mx-10 text-xl">
        <img class="w-full md:max-w-[360px]" src="https://prescripto.vercel.app/assets/contact_image-IJu_19v_.png" alt="Doctor_Contact_Image" />
        <div class="flex flex-col justify-center items-start gap-6">
          <p class=" font-semibold text-2xl text-gray-700">OUR OFFICE</p>
          <p class=" text-gray-500">00000 Willms Station <br/> Suite 000, Washington, USA</p>
          <p class=" text-gray-500">Tel: (000) 000-0000 <br/> Email: greatstackdev@gmail.com</p>
          <p class=" font-semibold text-2xl text-gray-700">CAREERS AT PRESCRIPTO</p>
          <p class=" text-gray-500">Learn more about our teams and job openings.</p>
          <button class="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Contact;