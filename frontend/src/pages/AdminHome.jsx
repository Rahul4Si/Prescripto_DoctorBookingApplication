
import React from "react";
import Sidebar from "../components/Sidebar.jsx";

const AdminHome = ({children}) => {
  const userProfile = localStorage.getItem("userProfile") || "user";
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full shadow-lg mr-3 mt-3">
        {children}
      </div>
      
    </div>
  );
};

export default AdminHome;