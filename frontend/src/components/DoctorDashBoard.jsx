import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/apiConfig";
import { FaCheck } from "react-icons/fa";

const DoctorDashBoard = () => {
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

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Doctor Dashboard</h1>
      {loading ? (
        <p className="text-center text-blue-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div>
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex-1">
              <h2 className="text-xl font-semibold mb-4">Total Earnings</h2>
              <p className="text-lg font-bold text-green-600">
                ₹
                {appointments
                  .filter((appointment) => appointment.isCompleted)
                  .reduce(
                    (total, appointment) => total + appointment.amount,
                    0
                  )}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex-1">
              <h2 className="text-xl font-semibold mb-4">Total patients Treated</h2>
              <p className="text-lg font-bold text-blue-600">
                {[...new Set(appointments
                  .filter((appointment) => appointment.isCompleted)
                  .map((appointment) => appointment.userId._id)
                )].length}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex-1">
              <h2 className="text-xl font-semibold mb-4">Completed Appointment</h2>
              <p className="text-lg font-bold text-blue-600">
                {appointments.filter(
                  (appointment) => appointment.isCompleted
                ).length}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Active Appointments</h2>
            {appointments.filter(
              (appointment) =>
                !appointment.cancelled && !appointment.isCompleted
            ).length === 0 ? (
              <p className="text-center text-gray-500">
                No active appointments available.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="py-2 px-4 text-left">Patient</th>
                      <th className="py-2 px-4 text-left">Date</th>
                      <th className="py-2 px-4 text-left">Time</th>
                      <th className="py-2 px-4 text-left">Amount</th>
                      <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments
                      .filter(
                        (appointment) =>
                          !appointment.cancelled && !appointment.isCompleted
                      )
                      .map((appointment, index) => (
                        <tr
                          key={appointment._id}
                          className={
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }
                        >
                          <td className="py-2 px-4">
                            {appointment?.userId?.name}
                          </td>
                          <td className="py-2 px-4">{appointment.slotDate}</td>
                          <td className="py-2 px-4">{appointment.slotTime}</td>
                          <td className="py-2 px-4">₹{appointment.amount}</td>
                          <td className="py-2 px-4">
                            <button
                              onClick={() => handleCompleteAppointment(appointment._id)}
                              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                            >
                              <FaCheck />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashBoard;
