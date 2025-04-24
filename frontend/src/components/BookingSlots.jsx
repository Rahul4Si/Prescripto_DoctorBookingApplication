import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/apiConfig";

const BookingSlots = ({doctorId}) => {
  const [selectedDate, setSelectedDate] = useState({});
  const [selectedTime, setSelectedTime] = useState("");
  const [bookStatus, setBookStatus] = useState(false);
  const navigate = useNavigate();

  // Function to get the next 7 days
  const getNext7Days = () => {
    const today = new Date();
    const days = [];
    const weekDayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);

      // Format date as YYYY-MM-DD
      const formattedDate = nextDay.toISOString().split("T")[0];

      days.push({
        date: formattedDate, // Use formatted date
        weekDay: weekDayNames[nextDay.getDay()], // Get the weekday name
      });
    }
    return days;
  };

  const timeSlots = [
    "09:00 AM - 09:30 AM", 
    "09:30 AM - 10:00 AM",
    "10:00 AM - 10:30 AM",
    "10:30 AM - 11:00 AM",
    "11:00 AM - 11:30 AM",
    "11:30 AM - 12:00 PM",
    "12:00 PM - 12:30 PM",
    "12:30 PM - 01:00 PM",
    "01:00 PM - 01:30 PM",
    "01:30 PM - 02:00 PM",
    "02:00 PM - 02:30 PM",
    "02:30 PM - 03:00 PM",
    "03:00 PM - 03:30 PM",
    "03:30 PM - 04:00 PM",
    "04:00 PM - 04:30 PM",
    "04:30 PM - 05:00 PM",
  ];

  const days = getNext7Days();

  const handleDoctorBooking = async() => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/bookDoctor`, {doctorId,slotDate:selectedDate.date,slotTime:selectedTime}, {headers: {token: localStorage.getItem('token')}});
      if (response.data.success) {
        toast.success(response.data.message);
        setSelectedDate({});
        setSelectedTime("");
        setBookStatus(false);
      } else {
        console.log(response.data.message);
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.error('Error booking doctor:', error.message);
      toast.error('Error booking doctor');      
    }
  };

  const handleDoctorBookingSlots = async() => {
    try {
      if(localStorage.getItem('token') === null){
        toast.error('Please login to book appointment');
        navigate('/login');
        return;
      }
      const response = await axios.post(`${BASE_URL}/api/user/checkBookingStatus`, {doctorId,slotDate:selectedDate.date,slotTime:selectedTime}, {headers: {token: localStorage.getItem('token')}});
      if (response.data.success) {
        setBookStatus(true);
        toast.success(response.data.message);
      } else {
        console.log(response.data.message);
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.error('Error booking doctor:', error.message);
      toast.error('Error booking doctor');
    }
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl p-5 ">
      <h2 className="flex items-center gap-2 text-4xl font-bold text-gray-800 mb-8">
        Booking Slots
      </h2>
      <h4 className="text-2xl font-semibold text-gray-700 mb-4">Select Date:</h4>
      <ul className="flex flex-wrap text-gray-700 text-xl my-6 gap-4">
        {days.map((day, index) => (
          <li
            onClick={() => {
              setSelectedDate(day);
              setBookStatus(false);
              setSelectedTime("");
            }}
            key={index}
            className={`border rounded-full px-6 py-3 cursor-pointer hover:bg-gray-300 transition-all duration-200 ${
              selectedDate.date === day.date ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {day.weekDay}, {day.date}
          </li>
        ))}
      </ul>
      {selectedDate?.date && (
      <h4 className="text-2xl font-semibold text-gray-700 mb-4">Select Time:</h4>
      )}
      <ul className="flex flex-wrap text-gray-700 text-xl my-6 gap-4">
        {selectedDate?.date &&
          timeSlots.map((timevalue, index) => (
            <li
              onClick={() => {
                setSelectedTime(timevalue);
                setBookStatus(false);
              }}
              key={index}
              className={`border rounded-full px-6 py-3 cursor-pointer hover:bg-gray-300 transition-all duration-200 ${
                selectedTime === timevalue ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {timevalue}
            </li>
          ))}
      </ul>
      {selectedDate?.date && selectedTime && !bookStatus && (
        <button
          onClick={handleDoctorBookingSlots}
          className="py-4 text-xl font-semibold border w-full rounded-full bg-blue-500 hover:bg-blue-700 text-white transition-all duration-200"
        >
          Check Booking Slot
        </button>
      )}
      {selectedDate?.date && selectedTime && bookStatus && (
        <button
          onClick={handleDoctorBooking}
          className="py-4 text-xl font-semibold border w-full rounded-full bg-green-500 hover:bg-green-700 text-white transition-all duration-200 mt-4"
        >
          Book Appointment
        </button>
      )}
    </div>
  );
};

export default BookingSlots;