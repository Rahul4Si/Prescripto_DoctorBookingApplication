import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/apiConfig"; // Ensure BASE_URL is imported

const DoctorLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDoctorLogin = async (e) => {
    e.preventDefault();
    try {
      const {email,password} = formData
      const response = await axios.post(`${BASE_URL}/api/doctor/doctorLogin`, {email,password});
      if (response.data.success) {
        localStorage.setItem('userProfile','doctor')
        localStorage.setItem('token',response.data.token)
        toast.success(response.data.message);
        navigate('/doctor-dashboard')
        window.location.reload()
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-40 p-6 bg-white/30 backdrop-blur-md rounded-lg shadow-lg w-[30rem] mx-auto my-10 ">
        <div className="ml-[-1rem]">
          <h1 className="text-2xl font-bold mb-6">
            <span className="text-blue-600">Doctor</span> Login
          </h1>
        </div>

        <form
          className="bg-white p-6 rounded  w-full max-w-sm"
          onSubmit={handleDoctorLogin}
        >
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full mt-4"
            >
              Login
            </button>
        </form>
      </div>
    </>
  );
};

export default DoctorLogin;