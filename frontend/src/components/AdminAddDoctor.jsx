import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const AdminAddDoctor = ({ doctor }) => {
  const path = window.location.pathname.replace("/", "");
  const [formData, setFormData] = useState({
    doctorName: "",
    doctorEmail: "",
    password: "",
    experience: "1-2 years",
    fees: 0,
    speciality: "Cardiologist",
    degree: "",
    addressLine1: "",
    addressLine2: "",
    about: "",
    image: "",
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        doctorName: doctor.name || "",
        doctorEmail: doctor.email || "",
        password: "",
        experience: doctor.experience || "",
        fees: doctor.fees || "",
        speciality: doctor.speciality || "",
        degree: doctor.degree || "",
        addressLine1: doctor.address?.line1 || "",
        addressLine2: doctor.address?.line2 || "",
        about: doctor.about || "",
        image: doctor.image || "",
      });
    }
  }, [doctor]);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddDoctorSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      // {"name":"Rahul","email":"rahul@123","password":"rahul@123","image":"rahul@123","speciality":"rahul@123","degree":"rahul@123","experience":3,
      //   "about":"rahul@123","fees":500,"address":{"line1":"N.M-377,Amlori","line2":"Singrauli,MP"}}
      const {
        doctorName,
        doctorEmail,
        password,
        experience,
        fees,
        speciality,
        degree,
        addressLine1,
        addressLine2,
        about,
        image,
      } = formData;
      const response = await axios.post(
        "https://prescripto-doctorbookingapplication.onrender.com/api/admin/addDoctor",
        {
          name: doctorName,
          email: doctorEmail,
          password,
          image,
          speciality,
          degree,
          experience,
          about,
          fees,
          address: { line1: addressLine1, line2: addressLine2 },
        },
        { headers: { admintoken: token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          doctorName: "",
          doctorEmail: "",
          password: "",
          experience: 1,
          fees: 0,
          speciality: "Cardiologist",
          degree: "",
          addressLine1: "",
          addressLine2: "",
          about: "",
          image: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  const handleUpdateDoctorSubmit = async (e) => {
    e.preventDefault();
    // console.log('update doctor')
    try {
      const {
        doctorName,
        experience,
        fees,
        speciality,
        degree,
        about,
        image,
      } = formData;
      const response = await axios.post(
        `https://prescripto-doctorbookingapplication.onrender.com/api/admin/updateDoctor`,
        {
          doctorId: doctor._id,
          name: doctorName,
          image,
          speciality,
          degree,
          experience,
          about,
          fees,
        },
        { headers: { admintoken: token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  }

  const handleCancelButton = async(e) =>{
    window.location.reload();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-3/4 p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {path === "add-doctor" ? "Add Doctor" : "Update Doctor"}
        </h2>
        <form >
          <div className="grid grid-cols-2 gap-6">
            {/* Left Side */}
            <div>
              <div className="mb-4">
                <label
                  htmlFor="doctorName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Doctor Name
                </label>
                <input
                  type="text"
                  id="doctorName"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter doctor's name"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="doctorEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Doctor Email
                </label>
                <input
                  type="email"
                  id="doctorEmail"
                  name="doctorEmail"
                  disabled={path === "add-doctor" ? false : true}
                  value={formData.doctorEmail}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter doctor's email"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  disabled={path === "add-doctor" ? false : true}
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter password"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700"
                >
                  Experience
                </label>
                <select
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value={1}>1 years</option>
                  <option value={2}>2 years</option>
                  <option value={3}>3 years</option>
                  <option value={4}>4 years</option>
                  <option value={5}>5 years</option>
                  <option value={6}>6 years</option>
                  <option value={7}>7 years</option>
                  <option value={8}>8 years</option>
                  <option value={9}>9 years</option>
                  <option value={10}>10 years</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="fees"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fees
                </label>
                <input
                  type="number"
                  id="fees"
                  name="fees"
                  value={formData.fees}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter fees"
                />
              </div>
            </div>

            {/* Right Side */}
            <div>
              <div className="mb-4">
                <label
                  htmlFor="speciality"
                  className="block text-sm font-medium text-gray-700"
                >
                  Speciality
                </label>
                <select
                  id="speciality"
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Pediatrician">Pediatrician</option>
                  <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="General Physician">General Physician</option>
                  <option value="Dentist">Dentist</option>
                  <option value="Oncologist">Oncologist</option>
                  <option value="ENT Specialist">ENT Specialist</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="degree"
                  className="block text-sm font-medium text-gray-700"
                >
                  Degree
                </label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter degree"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="addressLine1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  disabled={path === "add-doctor" ? false : true}
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter address line 1"
                />
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  disabled={path === "add-doctor" ? false : true}
                  value={formData.addressLine2}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter address line 2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="degree"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add Image Link
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter Image Link"
                />
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Doctor"
                    className="mt-2 w-20 h-20 rounded-md"
                  />
                ) : (
                  <p className="mt-2 text-gray-500">No image provided</p>
                )}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              About Doctor
            </label>
            <textarea
              id="about"
              name="about"
              rows={4}
              value={formData.about}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter details about the doctor"
            />
          </div>
          <div className="flex justify-center">
            {path === "add-doctor" ? (
              <button
                type="submit"
                onClick={handleAddDoctorSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
              >
                Add Doctor
              </button>
            ) : (
              <div className="space-x-4">
                <button
                  type="submit"
                  onClick={handleUpdateDoctorSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                >
                  Update Doctor
                </button>
                <button
                  type="submit"
                  onClick={handleCancelButton}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-800"
                >
                  Go Back
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddDoctor;
