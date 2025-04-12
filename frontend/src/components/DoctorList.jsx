
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import AdminAddDoctor from "./AdminAddDoctor";

const DoctorList = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [showDoctorList, setShowDoctorList] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDoctorData() {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8000/api/admin/getDoctors",
        { headers: { admintoken: token } }
      );
      if (response.data.success) {
        setDoctorList(response.data.doctors);
      } else {
        console.log(response.data.message);
      }
    }
    fetchDoctorData();
  }, []);

  const handleEditClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorList(false);
  };

  return (
    <>
      {showDoctorList ? (
        <div className="mt-10">
          <div className="flex flex-col items-center space-y-10">
            <h1 className="text-4xl font-bold underline mb-5">All Doctors</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {doctorList.map((category, index) => (
                <div
                  key={index}
                  className="relative flex flex-col w-auto mb-5 border shadow-md  rounded-2xl text-white items-center transform scale-100 transition-transform duration-300 hover:translate-y-[-15px]"
                >
                  <div className="bg-blue-300 hover:bg-blue-600">
                    <svg
                      onClick={() => handleEditClick(category)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 absolute top-4 right-4 cursor-pointer"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#ebf4f5"
                        d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"
                      />
                    </svg>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="rounded-lg w-72"
                    />
                  </div>
                  <div  className="bg-white text-black p-5 w-full ">
                    <h2  className="font-semibold text-xl">{category.name}</h2>
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
      ):(
        <AdminAddDoctor doctor={selectedDoctor}  />
      )}
    </>
  );
};

export default DoctorList;