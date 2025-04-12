import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { BASE_URL } from "../config/apiConfig"; // Ensure BASE_URL is imported

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/doctor/getDoctorAppointments`,
          {
            headers: { token: token },
          }
        );
        if (response.data.success === true) {
          const data = response.data.appointments;
          console.log(data);
          setAppointments(data);
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

  const calculateAgeFromDDMMYYYY = (dobString) => {
    if (!dobString || typeof dobString !== "string") {
      console.error("Invalid or missing date string:", dobString);
      return NaN;
    }

    const [day, month, year] = dobString.split("/").map(Number);
    const dob = new Date(year, month - 1, day); // Month is 0-based in JS Date

    if (isNaN(dob)) {
      console.error("Invalid parsed date:", dobString);
      return NaN;
    }

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();

    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

  const formatDateTime = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  const handleCancelAppointment = async (id) => {
    const token = localStorage.getItem("token");
    try{
      const response = await axios.post(
        `${BASE_URL}/api/doctor/cancelAppointment`,
        { appointmentId : id },
        {
          headers: { token: token },
        }
      );
      if (response.data.success === true) {
        const updatedAppointment = response.data.appointment;
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === updatedAppointment._id ? updatedAppointment : appointment
          )
        );
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    }
    catch(err){
      console.error("Error:", err);
      toast.error(err.message || "Something went wrong");
    }
  };

  const handleCompleteAppointment = async (id) => {
    const token = localStorage.getItem("token");
    try{
      const response = await axios.post(
        `${BASE_URL}/api/doctor/completeAppointment`,
        { appointmentId : id },
        {
          headers: { token: token },
        }
      );
      console.log(response.data);
      if (response.data.success === true) {
        const updatedAppointment = response.data.appointment;
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === updatedAppointment._id ? updatedAppointment : appointment
          )
        );
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    }
    catch(err){
      console.error("Error:", err);
      toast.error(err.message || "Something went wrong");
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Appointments</h1>

      {loading && <p>Loading appointments...</p>}
      {appointments?.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="min-w-full border border-gray-200 text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Patient</th>
              <th className="border px-4 py-2">Payment</th>
              <th className="border px-4 py-2">Age</th>
              <th className="border px-4 py-2">Date & Time</th>
              <th className="border px-4 py-2">Fees</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((appointment, index) => (
              <tr key={appointment._id} className="hover:bg-gray-50 transition">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  <div className="flex items-center justify-center space-x-2">
                    <img
                      src={appointment?.userId[0]?.image}
                      alt="profile"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <p className="font-semibold">
                      {appointment?.userId[0]?.name}
                    </p>
                  </div>
                </td>
                <td className="border px-4 py-2">
                  {appointment.payment ? (
                    <p className="text-green-600 font-medium">Online</p>
                  ) : (
                    <p className="text-red-500 font-medium">Cash</p>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {calculateAgeFromDDMMYYYY(appointment?.userId[0]?.dob)} years
                </td>
                <td className="border px-4 py-2">
                  {formatDateTime(appointment.createdAt)}
                </td>
                <td className="border px-4 py-2">₹{appointment.amount}</td>
                <td className="border px-4 py-2">
                  {appointment.cancelled === true ? (
                    <p className="text-yellow-500 font-medium">Cancelled</p>
                  ) : appointment.isCompleted === true ? (
                    <p className="text-green-500 font-medium">Completed</p>
                  ) : (
                    <div className="flex justify-center space-x-2">
                      <RxCross2
                        className="cursor-pointer p-1 rounded-full bg-gray-200"
                        onClick={() => handleCancelAppointment(appointment._id)}
                        size={25}
                        color="red"
                      />
                      <FaCheck
                        className="cursor-pointer p-1 rounded-full bg-gray-200"
                        onClick={() => handleCompleteAppointment(appointment._id)}
                        size={25}
                        color="green"
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorAppointments;
