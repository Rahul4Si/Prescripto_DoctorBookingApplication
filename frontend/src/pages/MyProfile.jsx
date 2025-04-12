import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { BASE_URL } from "../config/apiConfig"; // Ensure BASE_URL is imported

const MyProfile = () => {
  const [user, setUser] = useState({});
  const [editState, setEditState] = useState(true);
  const [formData, setFormData] = useState({
    phone: "",
    addressLine1: "",
    addressLine2: "",
    dob: "",
    gender: "Male",
    image: " ",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/getUserProfile`, {
          headers: {
            token: localStorage.getItem('token')
          }
        });
        if (response.data.success) {
          console.log(response.data.user);
          setUser(response.data.user);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [editState]);

  const handleProfileUpdate = async () => {
    const { phone, addressLine1, addressLine2, dob, gender, image } = formData;
    try {
      const response = await axios.post(`${BASE_URL}/api/user/updateUserProfile`, { phone, addressLine1, addressLine2, dob, gender, image }, { headers: { token: localStorage.getItem('token') } });
      if (response.data.success) {
        toast.success(response.data.message);
        setEditState(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating user profile:', error.message);
      toast.error('Error updating user profile');
    }
  };

  const handleEditProfile = () => {
    setEditState(false);
    setFormData({
      phone: user.phone,
      addressLine1: user?.address?.[0],
      addressLine2: user?.address?.[1],
      dob: user.dob,
      gender: user.gender,
      image: user.image,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="p-6 bg-slate-50 shadow-md rounded-lg m-10">
      <div className="flex flex-col">
        <img
          className="w-48 h-48"
          src={user.image}
          alt="User"
        />
        <h2 className="text-2xl font-semibold my-2">John Doe</h2>
        <hr />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-3 text-green-500">Contact Information</h3>
        <p className="mb-2 text-gray-600"><strong>Email: </strong>{user.email}</p>
        {
          editState ? (<p className="mb-2 text-gray-600"><strong>Phone: </strong>{user.phone}</p>) : (<p className="mb-2 text-gray-600"><strong>Phone: </strong><input name="phone" onChange={handleChange} className='border border-gray-600 rounded-md px-3 py-1 mx-2 bg-slate-200' type="text" value={formData.phone} /></p>)
        }
        <p className="mb-1 flex space-x-4"><strong>Address:</strong>
          <div className='flex flex-col space-y-2 w-[20%]'>
            {
              editState ? <p className="text-gray-600">{user?.address?.[0] || `Not Available`}</p> : <input name="addressLine1" onChange={handleChange} className='border border-gray-600 rounded-md px-3 py-1 mx-2 bg-slate-200' type="text" value={formData.addressLine1} />
            }
            {
              editState ? <p className="text-gray-600">{user?.address?.[1] || `Not Available`}</p> : <input name="addressLine2" onChange={handleChange} className='border border-gray-600 rounded-md px-3 py-1 mx-2 bg-slate-200' type="text" value={formData.addressLine2} />
            }
          </div>
        </p>
      </div>
      <div className="my-8">
        <h3 className="text-xl font-semibold mb-3 text-green-500">Basic Information</h3>
        {
          editState ? (<p className="mb-2 text-gray-600"><strong>Gender: </strong>{user.gender}</p>) : (<p className="mb-2 text-gray-600"><strong>Gender: </strong><select
            name="gender"
            onChange={handleChange}
            className='border border-gray-600 rounded-md px-3 py-1 mx-2 bg-slate-200'
            value={formData.gender}
          >
            <option value="Not Selected">Not Selected</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select></p>)
        }
        {
          editState ? (<p className="mb-2 text-gray-600"><strong>Date of Birth: </strong>{user.dob}</p>) : (<p className="mb-2 text-gray-600"><strong>Date of Birth: </strong><input name="dob" onChange={handleChange} className='border border-gray-600 rounded-md px-3 py-1 mx-2 bg-slate-200' type="text" value={formData.dob} /></p>)
        }
        {
          editState ? (
            <p className="mb-2 text-gray-600 flex space-x-10 items-center">
              <div className='flex flex-row items-center'>
                <strong>Image : </strong>
                <img className='rounded-full w-20' src={user.image} alt="New_Profile_Pic" />
              </div>
            </p>
          ) : (
            <p className="mb-2 text-gray-600 flex space-x-10 items-center">
              <div>
                <strong>Image Link: </strong>
                <input name="image" onChange={handleChange} className='border border-gray-600 rounded-md px-3 py-1 mx-2 bg-slate-200' type="text" value={formData.image} />
              </div>
              <img className='rounded-full w-20' src={formData.image} alt="New_Profile_Pic" />
            </p>)
        }
      </div>
      <div className="mt-6 flex">
        {
          editState ? (
            <button
              onClick={handleEditProfile}
              className="px-4 py-2 border text-gray-500 rounded-full hover:bg-blue-400 hover:text-white"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleProfileUpdate}
              className="px-4 py-2 border text-gray-500 rounded-full hover:bg-blue-400 hover:text-white"
            >
              Update Profile
            </button>
          )
        }
      </div>
    </div>
  );
};

export default MyProfile;