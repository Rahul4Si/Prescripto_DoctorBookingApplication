import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../config/apiConfig";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [cancelledAppointments, setCancelledAppointments] = useState([]);
  const [appointmentStatus, setAppointmentStatus] = useState("Active");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/admin/getAllAppointment`,
          {
            headers: {
              admintoken: localStorage.getItem("token"),
            },
          }
        );
        console.log(response);
        if (response.data.success) {
          const appointmentsData = response.data.appointments;
          setAppointments(appointmentsData);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="mx-20 my-10 p-6">
      <h1 className="my-5 text-3xl font-extrabold text-gray-900 text-center bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Appointments
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-blue-100 text-gray-700 text-center">
              <th className="border text-xl border-gray-300 px-6 py-3">Doctor</th>
              <th className="border text-xl border-gray-300 px-6 py-3">User</th>
              <th className="border text-xl border-gray-300 px-6 py-3">Date</th>
              <th className="border text-xl border-gray-300 px-6 py-3">Time</th>
              <th className="border text-xl border-gray-300 px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 text-center`}
              >
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-semibold text-lg text-gray-800">{appointment.docId.name}</p>
                  <p className="text-gray-500 text-sm">{appointment.docId.speciality}</p>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-semibold text-lg text-gray-800">{appointment.userId.name}</p>
                  <p className="text-gray-500 text-sm">{appointment.userId.email}</p>
                </td>
                <td className="border border-gray-300 px-6 py-4 text-gray-700">{appointment.slotDate}</td>
                <td className="border border-gray-300 px-6 py-4 text-gray-700">{appointment.slotTime}</td>
                <td className="border border-gray-300 px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      appointment.cancelled
                        ? "bg-red-100 text-red-600"
                        : appointment.isCompleted
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {appointment.cancelled
                      ? "Cancelled"
                      : appointment.isCompleted
                      ? "Completed"
                      : "Active"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;