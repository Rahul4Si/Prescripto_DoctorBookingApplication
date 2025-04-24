import React from "react";
import Sidebar from "../../components/Sidebar";
import DoctorNavbar from "../../components/DoctorNavbar";

const DoctorHome = ({ children }) => {
  return (
    <>
      <DoctorNavbar />
      <div className="flex">
        <Sidebar />
        <div className="w-full shadow-lg mr-3 mt-3">{children}</div>
      </div>
    </>
  );
};

export default DoctorHome;
