
import React from 'react'

const Appointment = () => {
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
  return (
    <div>Appointment</div>
  )
}

export default Appointment