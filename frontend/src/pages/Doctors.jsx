import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/apiConfig";

const Doctors = () => {
  const navigate = useNavigate();
  const [doctorList, setDoctorList] = useState([]);
  const [specialityList, setSpecialityList] = useState([]);
  const [specialitySelected, setSpecialitySelected] = useState("");

  useEffect(() => {
    async function fetchDoctorCategoryData() {
      try {
        const response = await axios.get(`${BASE_URL}/api/doctor/getDoctorsCategories`);
        if (response.data.success) {
          setSpecialityList(response.data.specialties);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching specialties:", error);
      }
    }
    fetchDoctorCategoryData();
  }, []);

  useEffect(() => {
    async function fetchDoctorData() {
      try {
        const response = await axios.get(`${BASE_URL}/api/doctor/getAllDoctorByCategory?speciality=${specialitySelected}`);
        if (response.data.success) {
          setDoctorList(response.data.doctors);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    }
    fetchDoctorData();
  }, [specialitySelected]);

  const handleClick = (doctor) => {
    navigate(`/doctorById/${doctor._id}`);
  };

  return (
    <div className="px-4 md:px-10 lg:px-20">
      <div className="mt-10">
        <h2 className="text-lg md:text-xl font-bold mb-4">Choose your speciality:</h2>
        <div className="flex flex-wrap gap-3">
          {specialityList.map((specialityItem, index) => (
            <div
              key={index}
              onClick={() => setSpecialitySelected(specialityItem)}
              className={`border cursor-pointer rounded-full px-5 py-2 md:py-3 ${specialitySelected === specialityItem ? 'bg-blue-600 text-white' : 'hover:bg-gray-300'}`}
            >
              {specialityItem}
            </div>
          ))}
          <div
            onClick={() => setSpecialitySelected('')}
            className={`border cursor-pointer rounded-full px-5 py-2 md:py-3 ${specialitySelected === "" ? 'bg-blue-600 text-white' : 'hover:bg-gray-300'}`}
          >
            All Doctors
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {doctorList.map((doctor, index) => (
            <div
              key={index}
              onClick={() => handleClick(doctor)}
              className="cursor-pointer flex flex-col border shadow-md rounded-2xl transform transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="bg-blue-300 hover:bg-blue-600 rounded-t-2xl">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="rounded-t-2xl w-full h-52 object-cover"
                />
              </div>
              <div className="bg-white text-black p-4">
                <h2 className="font-semibold text-lg md:text-xl">{doctor.name}</h2>
                <h3 className="text-gray-500 text-sm md:text-base">{doctor.speciality}</h3>
                <div className="flex items-center space-x-2 text-green-700 mt-2">
                  <GoDotFill />
                  <h3>Available</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
