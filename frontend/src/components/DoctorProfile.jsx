import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/doctor/getDoctorProfile', {
          headers: { token: token },  
        });

        if(response.data.success === true){
          const data = response.data.doctor;
          setDoctor(data);
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

  if (loading) return <p>Loading doctor profile...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 max-w-xl mx-auto border rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Doctor Profile</h2>
      <p><strong>Name:</strong> {doctor.name}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Specialization:</strong> {doctor.specialization}</p>
      <p><strong>Experience:</strong> {doctor.experience} years</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default DoctorProfile;
