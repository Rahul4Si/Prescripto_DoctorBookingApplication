import React, { useEffect, useState } from "react";
import Footer from "../components/Footer.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import BookingSlots from "../components/BookingSlots.jsx";
import { BASE_URL } from "../config/apiConfig"; // Ensure BASE_URL is imported

const Booking = () => {
  const { id } = useParams();
  const doctorId = id;
  console.log(doctorId);
  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    async function fetchDoctorData() {
      const response = await axios.get(
        `${BASE_URL}/api/user/getDoctorById`,
        { params: { id: doctorId } }
      );
      if (response.data.success) {
        console.log(response);
        setDoctor(response.data.doctor[0]);
      } else {
        console.log(response.data.message);
      }
    }
    fetchDoctorData();
  }, []);

  return (
    <>
      <div className="flex space-x-4 mx-48 mt-10">
        <div className="bg-blue-600 rounded-lg">
          <img src={doctor.image} className="h-72" alt="" />
        </div>
        <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {doctor.name}<FaCheckCircle fill="#0000FF" />
          </p>
          <p className="flex items-center gap-2 text-xl font-medium text-gray-500">{doctor.degree}-{doctor.speciality}</p>
          <p className="text-lg mt-4 text-gray-600 max-w-[700px]">
           {doctor.about}
          </p>
          <p className="text-gray-600 font-medium mt-4">
            Appointment fee: <span class="text-gray-800">${doctor.fees}</span>
          </p>
        </div>
      </div>
      <BookingSlots doctorId={doctorId}/>
    </>
  );
};

export default Booking;