import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="flex flex-col lg:flex-row bg-blue-600 mx-5 lg:mx-10 rounded-md justify-between my-20 pb-5">
      <div className="header-left text-white flex flex-col justify-center space-y-6 lg:space-y-8 px-5 lg:mx-20">
        <h1 className="text-3xl lg:text-5xl font-bold text-center lg:text-left">
          Book Appointment <br />
          With Trusted Doctors
        </h1>
        <p className="text-sm lg:text-lg text-center lg:text-left">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free. <br className="hidden lg:block" /> With
          state-of-the-art facilities and a patient-centered approach, we aim
          to deliver personalized care <br className="hidden lg:block" /> tailored
          to your unique needs.
        </p>
        <div className="flex justify-center lg:justify-start">
          <button
            onClick={() => {
              const section = document.getElementById("speciality");
              section.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-white rounded-full text-black px-5 py-3 w-[60%] lg:w-[40%] transform scale-100 transition-transform duration-300 hover:scale-110 font-medium"
          >
            <span className="flex space-x-2 pl-5 items-center">
              <h4>Book Appointment</h4>
              <FaArrowRight />
            </span>
          </button>
        </div>
      </div>
      <div className="header-right flex justify-center mt-5 lg:mt-0">
        <img
          src="https://media.istockphoto.com/id/512278456/photo/group-of-doctors-at-the-hospital.jpg?s=612x612&w=0&k=20&c=EPPHeKuq0YabUC-QCWlAOhTfIZAAPtrwQ96V_Wp0oKY="
          alt="Doctor_Group_Photo"
          className="rounded-md w-full lg:w-[500px] h-auto object-cover"
        />
      </div>
    </header>
  );
};

export default Header;