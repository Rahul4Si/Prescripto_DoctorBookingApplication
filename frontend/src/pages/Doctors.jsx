
import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const navigate = useNavigate()
  const [doctorList, setDoctorList] = useState([]);
  const [specialityList, setSpecialityList] = useState([]);
  const [specialitySelected, setSpecialitySelected] = useState("");

  useEffect(() => {
    async function fetchDoctorCategoryData() {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8000/api/doctor/getDoctorsCategories",
      );
      if (response.data.success) {
        setSpecialityList(response.data.specialties);
      } else {
        console.log(response.data.message);
      }
    }
    fetchDoctorCategoryData();
  }, []);

  useEffect(() => {
    async function fetchDoctorData() {
      const response = await axios.get(`http://localhost:8000/api/doctor/getAllDoctorByCategory?speciality=${specialitySelected}`);
      if (response.data.success) {
        setDoctorList(response.data.doctors);
      } else {
        console.log(response.data.message);
      }
    }
    fetchDoctorData();
  }, [specialitySelected]);

  const handleClick = (category) => {
    navigate(`/doctorById/${category._id}`);
  };

  return (
    <>
    <div>
      <div className="flex items-center ml-20">
        <div className="text-xl font-bold mx-3 my-9">Choose your speciality:</div>
        {specialityList.map((specialityItem, index) => (
          <div 
            key={index} 
            onClick={() => setSpecialitySelected(specialityItem)} 
            className={`border ${specialitySelected === specialityItem ? 'bg-blue-600 text-white ' : ''} cursor-pointer rounded-full px-5 py-3 mr-3 hover:bg-gray-300`}
          >
            {specialityItem}
          </div>
        ))}
        <div 
          onClick={() => setSpecialitySelected('')} 
          className={`border ${specialitySelected === "" ? 'bg-blue-600 text-white ' : ''} cursor-pointer rounded-full px-5 py-3 mr-3 hover:bg-gray-300`}>All Dcotors</div>
      </div>
       <div  className="mt-10">
                <div className="flex flex-col items-center space-y-10">
      
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {doctorList.map((category, index) => (
                      <div
                        key={index}
                        onClick={() => handleClick(category)}
                        className="relative cursor-pointer flex flex-col w-auto mb-5 border shadow-md  rounded-2xl text-white items-center transform scale-100 transition-transform duration-300 hover:translate-y-[-15px]"
                      >
                        <div className="bg-blue-300 hover:bg-blue-600">
                          
                          <img
                            src={category.image}
                            alt={category.name}
                            className="rounded-lg w-72"
                          />
                        </div>
                        <div   className="bg-white text-black p-5 w-full">
                          <h2 className="font-semibold text-xl">{category.name}</h2>
                          <h3 className="text-gray-500 text-lg">
                            {category.speciality}
                          </h3>
                          <div className="flex items-center space-x-2 text-green-700">
                            <GoDotFill />
                            <h3>Available</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
    </div>
  </>
  );
};

export default Doctors;