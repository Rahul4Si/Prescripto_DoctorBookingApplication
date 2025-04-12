import React, { useState,useEffect } from 'react'
import axios from "axios"

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/getDashboardData', {
          headers: {
            admintoken : localStorage.getItem('token')
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
  }, [])

  return (
    <div className='flex justify-center space-x-28 flex-wrap mx-20'>
      <div className='bg-slate-100 flex items-center p-4 rounded-lg space-x-5'>
        <img className='h-20 w-20' src="https://static.vecteezy.com/system/resources/thumbnails/024/585/326/small_2x/3d-happy-cartoon-doctor-cartoon-doctor-on-transparent-background-generative-ai-png.png" alt="Doctor_Image" />
        <h3>{dashboardData.doctorCount} Doctors</h3>
      </div>
      <div className='bg-slate-100 flex items-center p-4 rounded-lg space-x-5'>
        <img className='h-20 w-20' src="https://icons.veryicon.com/png/o/commerce-shopping/mall-linear-icon-library/make-an-appointment-30.png" alt=" appointment_image" />
        <h3>{dashboardData.totalSum} Appointments</h3>
      </div>
      <div className='bg-slate-100 flex items-center p-4 rounded-lg space-x-5'>
        <img className='h-20 w-20' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" alt="User_image" />
        <h3>{dashboardData.userCount} Users</h3>
      </div>
    </div>
  )
}

export default AdminDashboard