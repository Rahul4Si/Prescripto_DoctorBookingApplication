import React, { useState, useEffect } from 'react';
import axios from "axios";
import { BASE_URL } from '../config/apiConfig';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/getDashboardData`, {
          headers: {
            admintoken: localStorage.getItem('token')
          }
        });
        if (response.data.success) {
          setDashboardData(response.data);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className='flex flex-col items-center space-y-10 p-10 bg-gray-50 min-h-screen'>
      <h1 className='text-3xl font-bold text-gray-800'>Admin Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl'>
        <div className='bg-white shadow-md flex items-center p-6 rounded-lg space-x-5'>
          <img className='h-20 w-20' src="https://static.vecteezy.com/system/resources/thumbnails/024/585/326/small_2x/3d-happy-cartoon-doctor-cartoon-doctor-on-transparent-background-generative-ai-png.png" alt="Doctor_Image" />
          <h3 className='text-xl font-semibold text-gray-700'>{dashboardData.doctorCount} Doctors</h3>
        </div>
        <div className='bg-white shadow-md flex items-center p-6 rounded-lg space-x-5'>
          <img className='h-20 w-20' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" alt="User_image" />
          <h3 className='text-xl font-semibold text-gray-700'>{dashboardData.userCount} Users</h3>
        </div>
        <div className='bg-white shadow-md flex items-center p-6 rounded-lg space-x-5'>
          <img className='h-20 w-20' src="https://icons.veryicon.com/png/o/commerce-shopping/mall-linear-icon-library/make-an-appointment-30.png" alt="appointment_image" />
          <h3 className='text-xl font-semibold text-gray-700'>{dashboardData.totalAppointments} Appointments</h3>
        </div>
        <div className='bg-white shadow-md flex items-center p-6 rounded-lg space-x-5'>
          <img className='h-20 w-20' src="https://icons.veryicon.com/png/o/commerce-shopping/mall-linear-icon-library/make-an-appointment-30.png" alt="appointment_image" />
          <h3 className='text-xl font-semibold text-gray-700'>{dashboardData.cancelledAppointments} Cancelled Appointments</h3>
        </div>
        <div className='bg-white shadow-md flex items-center p-6 rounded-lg space-x-5'>
          <img className='h-20 w-20' src="https://icons.veryicon.com/png/o/commerce-shopping/mall-linear-icon-library/make-an-appointment-30.png" alt="appointment_image" />
          <h3 className='text-xl font-semibold text-gray-700'>{dashboardData.completedAppointments} Completed Appointments</h3>
        </div>
        <div className='bg-white shadow-md flex items-center p-6 rounded-lg space-x-5'>
          <img className='h-20 w-20' src="https://icons.veryicon.com/png/o/commerce-shopping/mall-linear-icon-library/make-an-appointment-30.png" alt="appointment_image" />
          <h3 className='text-xl font-semibold text-gray-700'>{dashboardData.pendingAppointments} Pending Appointments</h3>
        </div>
        <div className='bg-white shadow-md p-6 rounded-lg w-full col-span-1 md:col-span-2 lg:col-span-3'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>Latest Bookings</h2>
          <ul className='space-y-6'>
            {dashboardData.appointments && dashboardData.appointments.slice(0, 3).map((appointment, index) => (
              <li key={index} className='flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-gray-100 rounded-lg shadow-sm'>
                <div className='mb-4 md:mb-0'>
                  <h3 className='text-lg font-semibold text-gray-700'>Patient Name: <span className='font-normal'>{appointment.userId.name}</span></h3>
                  <h3 className='text-lg font-semibold text-gray-700'>Patient Email: <span className='font-normal'>{appointment.userId.email}</span></h3>
                  <p className='text-lg font-semibold text-gray-700'>Doctor Name: <span className='font-normal'>{appointment.docId.name}</span></p>
                  <p className='text-lg font-semibold text-gray-700'>Speciality: <span className='font-normal'>{appointment.docId.speciality}</span></p>
                </div>
                <div className='text-sm text-gray-600'>
                  <h4 className='text-xl underline font-semibold text-gray-700'>Booking Details</h4>
                  <p className='text-lg font-semibold text-gray-700'>Booking Date: <span className='font-normal'>{appointment.slotDate}</span></p>
                  <p className='text-lg font-semibold text-gray-700'>Booking Time: <span className='font-normal'>{appointment.slotTime}</span></p>
                  <p className='text-lg font-semibold text-gray-700'>Payment Status: <span className='font-normal'>{appointment.paymentStatus}</span></p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;