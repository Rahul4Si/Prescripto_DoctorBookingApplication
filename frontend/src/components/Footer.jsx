
import React from 'react'

const Footer = () => {
  return (
    <>
    <div class="md:mx-32">
      <div class="flex flex-col justify-center sm:grid grid-cols-[2fr_1fr_1fr] gap-14 my-10  mt-40 text-sm">
        <div>
          {/* <img class="mb-5 w-40" src="/assets/logo-BNCDj_dh.svg" alt="" /> */}
          <h1 className='text-2xl font-bold mb-4 '>Medi<span className='text-blue-600'>Connect</span></h1>
          <p  style={{wordSpacing:"0.2rem"}} > At MediConnect Care Center, we are committed to providing exceptional healthcare with compassion and expertise. Whether you're visiting us for a routine check-up, seeking specialized treatment, or simply exploring ways to enhance your well-being, our dedicated team is here to support you every step of the way. With state-of-the-art facilities and a patient-centered approach, we aim to deliver personalized care tailored to your unique needs. Your health is our priority, and we are honored to be your trusted partner on the journey to better wellness.</p>
          </div>
          <div>
            <p class="text-xl font-medium mb-5">COMPANY</p>
            <ul class="flex flex-col gap-2 text-gray-600">
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div>
            <p class="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul class="flex flex-col gap-2 text-gray-600">
              <li>+0-000-000-000</li>
              <li>greatstackdev@gmail.com</li>
            </ul>
          </div>
        </div>
        <div>
          <hr/>
          <p class="py-5 text-sm text-center">Copyright 2025 @ Rahul.dev - All Right Reserved.</p>
        </div>
      </div>         
    </>
  )
}

export default Footer
