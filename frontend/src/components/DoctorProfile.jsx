import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config/apiConfig"; // Ensure BASE_URL is imported
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [edit,setEdit] = useState(false);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/doctor/getDoctorProfile`,
          {
            headers: { token: token },
          }
        );

        if (response.data.success === true) {
          const data = response.data.doctor;
          setDoctor(data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorProfile();
  }, []);

  const handleUpdateFees = async () => {
     try {
       const response = await axios.post(`${BASE_URL}/api/doctor/updateDoctorFees`, {
        updatedFees : doctor.fees,
       }, {
         headers: { token: localStorage.getItem("token") },
       });
       console.log(response.data)
        if (response.data.success) {
          const doctorData = response.data.doctor;
          setEdit(false);
          toast.success("Fees updated successfully!");
          setDoctor(doctorData);
        } else {
          toast.error("Error updating fees: " + response.data.message);
        }
     } catch (error) {
       setError(error.message);
       toast.error("Error updating fees: " + error.message);
      
     }
  }



  if (loading)
    return (
      <p className="text-center text-blue-500 font-semibold mt-4">
        Loading doctor profile...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 font-medium mt-4">
        Error: {error}
      </p>
    );

  return (
    <div className="p-6 max-w-2xl mx-auto mt-8 bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Doctor Profile
      </h2>
      <div className="space-y-3">
        <div className="flex justify-center mb-4 bg-blue-500 rounded-s-lg">
          <img src={doctor.image} alt="Doctor_Image" />
        </div>
        <p className="text-base">
          <strong className="text-gray-700">Name:</strong>{" "}
          <span className="text-gray-900">{doctor.name}</span>
        </p>
        <p className="text-base">
          <strong className="text-gray-700">Email:</strong>{" "}
          <span className="text-gray-900">{doctor.email}</span>
        </p>
        <p className="text-base">
          <strong className="text-gray-700">Specialization:</strong>{" "}
          <span className="text-gray-900">{doctor.speciality}</span>
        </p>
        <p className="text-base">
          <strong className="text-gray-700">Experience:</strong>{" "}
          <span className="text-gray-900">{doctor.experience} years</span>
        </p>
        <p className="text-base">
          <strong className="text-gray-700">About:</strong>{" "}
          <span className="text-gray-900">{doctor.about}</span>
        </p>
        <p className="text-base flex space-x-2">
          <strong className="text-gray-700">Address:</strong>{" "}
          <span className="text-gray-900">
            <p>{doctor.address.line1}</p>
            <p>{doctor.address.line2}</p>
          </span>
        </p>
        <p className="text-base">
          <strong className="text-gray-700">Fees:</strong>{" "}
          {
            edit ? (
              <input
                type="text"
                value={doctor.fees}
                onChange={(e) => setDoctor({ ...doctor, fees: e.target.value })}
                className="border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              <span className="text-gray-900">{doctor.fees}</span>
            )
          }
        </p>
      </div>
      <div className="mt-6 text-center">
        {
          edit ? (
            <button
              onClick={() => handleUpdateFees()}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Update Fees
            </button>
          ) : (
            <button
              onClick={() => setEdit(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-600"
            >
              Edit Fees
            </button>
          )
        }
      </div>
    </div>
  );
};

export default DoctorProfile;
