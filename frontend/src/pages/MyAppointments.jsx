import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../config/apiConfig";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [cancelledAppointments, setCancelledAppointments] = useState([]);
  const [appointmentStatus, setAppointmentStatus] = useState("Active");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/user/getUserAppointments`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (response.data.success) {
          setAppointments(response.data.appointments);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, [appointments]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/user/cancelledAppointments`,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        if (response.data.success) {
          console.log(response);
          setCancelledAppointments(response.data.cancelledAppointments);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleAppointmentCancel = async (appointment) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/user/cancelAppointment`,
        { appointmentId: appointment._id },
        { headers: { token: localStorage.getItem("token") } }
      );
      if (response.data.success) {
        console.log(response.data.message);
        toast.success(response.data.message);
        setAppointments([]);
      } else {
        console.log(response.data.message);
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Error cancelling appointment");
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="mx-20 my-10">
      <div>
        <h1 className="my-5 text-2xl font-bold ">My Appointments</h1>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => {
              setAppointmentStatus("Active");
            }}
            className={` px-5 ${
              appointmentStatus === "Active"
                ? "bg-blue-500 hover:bg-blue-700 text-white"
                : "bg-transparent hover:bg-gray-300"
            } py-2 border rounded-full `}
          >
            Active
          </button>
          <button
            onClick={() => {
              setAppointmentStatus("Cancelled");
            }}
            className={` px-5 ${
              appointmentStatus === "Cancelled"
                ? "bg-blue-500 hover:bg-blue-700 text-white"
                : "bg-transparent hover:bg-gray-300"
            } py-2 border rounded-full `}
          >
            Cancelled
          </button>
        </div>
        <hr />
      </div>
      {appointmentStatus === "Active" ? (
        appointments.length === 0 ? (
          <h1 className="text-2xl font-bold text-center">No Appointments</h1>
        ) : (
          <div>
            {appointments.map((appointment, index) => (
              <div>
                <div
                  key={index}
                  className="flex items-center text-xl justify-between "
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={appointment.docId.image}
                      className="h-[20%] w-[20%]"
                      alt="Appointment_Doctor_Image"
                    />
                    <div>
                      <h2>
                        <strong>Doctor Name: </strong>
                        {appointment.docId.name}
                      </h2>
                      <p>
                        <strong>Speciality: </strong>
                        {appointment.docId.speciality}
                      </p>
                      <p>
                        <strong> Date and Time:</strong> {appointment.slotDate}{" "}
                        at {appointment.slotTime}
                      </p>
                      <p>
                        <strong> Booking Date:</strong> {getCurrentDate()}
                      </p>
                      <p className="flex gap-2">
                        <strong> Address:</strong>{" "}
                        <div className="flex flex-col">
                          <p>{appointment.docId.address.line1}</p>
                          <p>{appointment.docId.address.line2}</p>{" "}
                        </div>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4 text-lg">
                    <button className="bg-transparent hover:bg-blue-600 hover:text-white px-5 py-3 p-2 border rounded-lg min-w-52">
                      Pay Online
                    </button>
                    <button
                      onClick={() => handleAppointmentCancel(appointment)}
                      className="bg-transparent hover:bg-blue-600 hover:text-white px-5 py-3 border p-2 rounded-lg "
                    >
                      Cancel Appointment
                    </button>
                  </div>
                </div>
                <hr className="mt-3" />
              </div>
            ))}
          </div>
        )
      ) : (
        <>
          {cancelledAppointments.length === 0 ? (
            <h1 className="text-2xl font-bold text-center">
              No Cancelled Appointments
            </h1>
          ) : (
            cancelledAppointments.map((appointment, index) => (
              <div>
                <div
                  key={index}
                  className="flex items-center text-xl justify-between "
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={appointment.doctorId.image}
                      className="h-[20%] w-[20%]"
                      alt="Appointment_Doctor_Image"
                    />
                    <div>
                      <h2>
                        <strong>Doctor Name: </strong>
                        {appointment.doctorId.name}
                      </h2>
                      <p>
                        <strong>Speciality: </strong>
                        {appointment.doctorId.speciality}
                      </p>
                      <p>
                        <strong> Cancelled on:</strong>{" "}
                        {formatDate(appointment.updatedAt)}
                      </p>
                      <p className="flex gap-2">
                        <strong> Address:</strong>{" "}
                        <div className="flex flex-col">
                          <p>{appointment.doctorId.address.line1}</p>
                          <p>{appointment.doctorId.address.line2}</p>{" "}
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="mt-3" />
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default MyAppointments;