
import React from "react";
import Sidebar from "../../components/Sidebar";

const DoctorHome = ({children}) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full shadow-lg mr-3 mt-3">
        {children}
      </div>
      
    </div>
  );
};

export default DoctorHome;