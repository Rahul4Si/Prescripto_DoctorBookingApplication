
import React from "react";
import Header from "../components/Header.jsx";
import Speciality from "../components/Speciality.jsx";
import TopDoctors from "../components/TopDoctors.jsx";
import Banner from "../components/Banner.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  const userProfile = localStorage.getItem("userProfile") || "user";
  console.log(userProfile)
  return (
    <div>
      {userProfile === "user" && (
        <>
          <Header />
          <Speciality />
          <TopDoctors />
          <Banner />
        </>
      )}
    </div>
  );
};

export default Home;
