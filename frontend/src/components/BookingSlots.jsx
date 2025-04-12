
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
      days.push({
        date: nextDay.getDate(), // Format as YYYY-MM-DD
        weekDay: weekDayNames[nextDay.getDay()], // Get the weekday name
      });
    }
    return days;
  };

  const timeSlots = [
    "10AM-11AM",
    "11AM-12PM",
    "12PM-1PM",
    "1PM-2PM",
    "2PM-3PM",
    "3PM-4PM",
    "4PM-5PM",
    "5PM-6PM",
    "6PM-7PM",
  ];

  const days = getNext7Days();

  const handleDoctorBooking = async() => {
    try {
      const response = await axios.post('http://localhost:8000/api/user/bookDoctor', {doctorId,slotDate:selectedDate.date,slotTime:selectedTime}, {headers: {token: localStorage.getItem('token')}});
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
      const response = await axios.post('http://localhost:8000/api/user/checkBookingStatus', {doctorId,slotDate:selectedDate.date,slotTime:selectedTime}, {headers: {token: localStorage.getItem('token')}});
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
    <div className="mx-60 mt-10">
      <h2 className="flex items-center gap-2 text-3xl font-medium text-gray-700">
        Booking Slots
      </h2>
      <ul className="flex flex-wrap text-gray-600 text-2xl my-10 space-x-5">
        {days.map((day, index) => (
          <li
            onClick={() => {
              setSelectedDate(day);
              setBookStatus(false);
              setSelectedTime("");
            }}
            key={index}
            className={`border rounded-full px-5 py-3 cursor-pointer hover:bg-gray-300 ${
              selectedDate.date === day.date ? " bg-blue-600 text-white" : ""
            }`}
          >
            {day.weekDay}, {day.date}
          </li>
        ))}
      </ul>
      <ul className="flex flex-wrap text-gray-600 text-2xl my-10 space-x-5 space-y-5">
        {selectedDate?.date &&
          timeSlots.map((timevalue, index) => (
            <li
              onClick={() => {
                setSelectedTime(timevalue);
                setBookStatus(false);
              }}
              key={index}
              className={`border rounded-full px-5 py-3 cursor-pointer hover:bg-gray-300 ${
                selectedTime === timevalue ? " bg-blue-600 text-white" : ""
              }`}
            >
              {timevalue}
            </li>
          ))}
      </ul>
    {
      selectedDate?.date && selectedTime && !bookStatus && (
        <button onClick={handleDoctorBookingSlots} className=" py-4 text-xl border w-[80%] rounded-full bg-blue-500 hover:bg-blue-700 text-white">
          Check Booking Slot
        </button>
      )}
      {
      selectedDate?.date && selectedTime && bookStatus && (
        <button onClick={handleDoctorBooking} className=" py-4 text-xl border w-[80%] rounded-full bg-blue-500 hover:bg-blue-700 text-white">
          Book Appointment
        </button>
      )
    }
    </div>
  );
};

export default BookingSlots;