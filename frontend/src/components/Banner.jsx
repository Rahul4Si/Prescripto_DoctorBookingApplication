import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <header className="flex bg-blue-600 mx-32 rounded-md justify-between my-40 pt-10  relative">
      <div className="header-left text-white flex flex-col justify-center space-y-8 mx-20 pb-10">
        <h1 className="text-5xl font-bold">
          Book Appointment
          <br />
          With 100+ Trusted
          <br />
          Doctors
        </h1>
        <button
          onClick={() => {
            navigate('/login')
            scrollTo(0,0)
          }}
          className="bg-white rounded-full text-black px-5 py-3 w-[15rem] transform scale-100 transition-transform duration-300 hover:scale-110 font-medium"
        >
          <span className="flex text-xl space-x-2 pl-5 items-center">
            <h4>Create Account</h4>
            <FaArrowRight />
          </span>
        </button>
      </div>
      <div className="header-right relative w-full max-w-md">
        <img
          src="https://prescripto.vercel.app/assets/appointment_img-DzbZlMsi.png"
          alt="Doctor_Group_Photo"
          className="absolute bottom-0 right-0 w-full"
        />
      </div>
    </header>
  );
};

export default Banner;