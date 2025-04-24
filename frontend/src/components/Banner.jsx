import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <header className="flex flex-col-reverse lg:flex-row bg-blue-600 mx-4 md:mx-16 lg:mx-32 rounded-md justify-between my-10 lg:my-40 pt-6 lg:pt-10 relative overflow-hidden">
      
      <div className="header-left text-white flex flex-col justify-center space-y-6 md:space-y-8 px-4 md:px-10 lg:mx-20 pb-6 md:pb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
          Book Appointment
          <br />
          With 100+ Trusted
          <br />
          Doctors
        </h1>
        
        <button
          onClick={() => {
            navigate('/login');
            scrollTo(0, 0);
          }}
          className="bg-white rounded-full text-black px-5 py-3 w-full md:w-[15rem] transform scale-100 transition-transform duration-300 hover:scale-110 font-medium"
        >
          <span className="flex text-lg md:text-xl space-x-2 pl-2 md:pl-5 items-center justify-center md:justify-start">
            <h4>Create Account</h4>
            <FaArrowRight />
          </span>
        </button>
      </div>

      <div className="header-right relative flex justify-center items-end w-full lg:max-w-md">
        <img
          src="https://prescripto.vercel.app/assets/appointment_img-DzbZlMsi.png"
          alt="Doctor_Group_Photo"
          className="w-3/4 md:w-full h-auto"
        />
      </div>
    </header>
  );
};

export default Banner;
