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

  const handleAppointmentCancel = async (Id) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/user/cancelAppointment`,
        { appointmentId: Id },
        { headers: { token: localStorage.getItem("token") } }
      );
      if (response.data.success) {
        console.log(response.data.message);
        toast.success(response.data.message);
        setAppointments((prevAppointments =>
          prevAppointments.filter((appointment) => appointment._id !== Id)
        ));
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

  const completedAppointments = appointments.filter(
    (appointment) => appointment.isCompleted
  );

  return (
    <div className="mx-20 my-10">
      <div>
        <h1 className="my-5 text-xl font-semibold">My Appointments</h1>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => {
              setAppointmentStatus("Active");
            }}
            className={`px-4 py-2 text-sm ${
              appointmentStatus === "Active"
                ? "bg-blue-500 hover:bg-blue-700 text-white"
                : "bg-transparent hover:bg-gray-300"
            } border rounded-full`}
          >
            All Appointments
          </button>
          <button
            onClick={() => {
              setAppointmentStatus("Cancelled");
            }}
            className={`px-4 py-2 text-sm ${
              appointmentStatus === "Cancelled"
                ? "bg-blue-500 hover:bg-blue-700 text-white"
                : "bg-transparent hover:bg-gray-300"
            } border rounded-full`}
          >
            Cancelled
          </button>
          <button
            onClick={() => {
              setAppointmentStatus("Completed");
            }}
            className={`px-4 py-2 text-sm ${
              appointmentStatus === "Completed"
                ? "bg-blue-500 hover:bg-blue-700 text-white"
                : "bg-transparent hover:bg-gray-300"
            } border rounded-full`}
          >
            Completed
          </button>
        </div>
        <hr />
      </div>
      {appointmentStatus === "Active" ? (
        appointments.length === 0 ? (
          <h1 className="text-xl font-semibold text-center">No Appointments</h1>
        ) : (
          <div>
            {appointments.map((appointment, index) => (
              <div key={index}>
                <div className="flex items-center text-base justify-between">
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
                        <strong className="text-gray-700">Speciality:</strong>{" "}
                        <span className="text-gray-900">{appointment.docId.speciality}</span>
                      </p>
                      <p>
                        <strong className="text-gray-700">Date and Time:</strong>{" "}
                        <span className="text-gray-900">{appointment.slotDate} at {appointment.slotTime}</span>
                      </p>
                      <p className="mt-2 text-sm">
                        <strong className="text-gray-700">Booking Date:</strong>{" "}
                        <span className="text-gray-900">{getCurrentDate()}</span>
                      </p>
                      <p className="mt-2 text-sm flex space-x-2 items-start">
                        <strong className="text-gray-700">Address:</strong>
                        <div className="flex flex-col text-gray-900 mt-1 space-y-1">
                          <p>{appointment.docId.address.line1}</p>
                          <p>{appointment.docId.address.line2}</p>
                        </div>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4 text-sm mt-4">
                    {appointment.cancelled ? (
                      <p className="text-red-600 font-medium px-3 rounded-lg border-red-600 py-2 border-2 text-center">
                        Appointment Cancelled
                      </p>
                    ) : appointment.isCompleted ? (
                      <p className="text-green-600 font-medium px-3 rounded-lg py-2 border-green-600 border-2 text-center">
                        Appointment Completed
                      </p>
                    ) : (
                      <>
                        <button className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg shadow-md text-sm">
                          Pay Online
                        </button>
                        <button
                          onClick={() => handleAppointmentCancel(appointment._id)}
                          className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg shadow-md text-sm"
                        >
                          Cancel Appointment
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <hr className="mt-6 border-gray-300" />
              </div>
            ))}
          </div>
        )
      ) : appointmentStatus === "Cancelled" ? (
        cancelledAppointments.length === 0 ? (
          <h1 className="text-xl font-semibold text-center">No Cancelled Appointments</h1>
        ) : (
          cancelledAppointments.map((appointment, index) => (
            <div key={index}>
              <div className="flex items-center text-base justify-between">
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
                      <strong> Cancelled on:</strong>{" "}
                      {formatDate(appointment.updatedAt)}
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
              </div>
              <hr className="mt-3" />
            </div>
          ))
        )
      ) : completedAppointments.length === 0 ? (
        <h1 className="text-xl font-semibold text-center">No Completed Appointments</h1>
      ) : (
        completedAppointments.map((appointment, index) => (
          <div key={index}>
            <div className="flex items-center text-base justify-between">
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
                    <strong> Completed on:</strong>{" "}
                    {formatDate(appointment.updatedAt)}
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
            </div>
            <hr className="mt-3" />
          </div>
        ))
      )}
    </div>
  );
};

export default MyAppointments;