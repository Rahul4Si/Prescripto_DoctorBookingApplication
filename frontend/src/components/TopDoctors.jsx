
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";

const TopDoctors = () => {
  const navigate = useNavigate();
  const doctors = [
    {
      name: "Dr. Arjun Sharma",
      specialty: "Cardiologist",
      docId: "REG1",
      image:
        "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc1.png",
    },
    {
      name: "Dr. Priya Menon",
      specialty: "Pediatrician",
      docId: "REG2",
      image:
        "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc2.png",
    },
    {
      name: "Dr. Rahul Gupta",
      specialty: "Orthopedic Surgeon",
      docId: "REG3",
      image:
        "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc3.png",
    },
    {
      name: "Dr. Kavya Iyer",
      specialty: "Dermatologist",
      docId: "REG4",
      image:
        "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc4.png",
    },
    {
      name: "Dr. Siddharth Joshi",
      specialty: "Neurologist",
      docId: "REG5",
      image:
        "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc5.png",
    },
    {
      name: "Dr. Meera Das",
      specialty: "Gynecologist",
      docId: "REG6",
      image:
        "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc6.png",
    },
    {
      name: "Dr. Akash Singh",
      specialty: "General Physician",
      docId: "REG7",
      image:
        "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc7.png",
    },
    {
      name: "Dr. Sneha Patel",
      specialty: "Dentist",
      docId: "REG8",
      image:
        "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc8.png",
    },
    {
      name: "Dr. Vishal Nair",
      specialty: "Oncologist",
      docId: "REG9",
      image:
        "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc9.png",
    },
    {
      name: "Dr. Anjali Reddy",
      specialty: "ENT Specialist",
      docId: "REG10",
      image:
        "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc10.png",
    },
  ];
  return (
    <div className="mt-10">
      <div className="flex flex-col items-center space-y-10">
        <h1 className="text-4xl font-bold">Top Doctors to Book</h1>
        <p className="text-lg">
          Simply browse through our extensive list of trusted doctors.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {doctors.map((category, index) => (
            <div
              onClick={() => navigate(`/appointment/${category.docId}`)}
              to={`/doctor/${category.speciality}`}
              key={index}
              className="flex flex-col w-auto mb-5 border shadow-md  rounded-2xl text-white items-center transform scale-100 transition-transform duration-300 hover:translate-y-[-15px]"
            >
              <div className="bg-blue-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="rounded-lg w-72"
                />
              </div>
              <div className="bg-white text-black p-5 w-full">
                <div className="flex items-center space-x-2 text-green-700">
                  <GoDotFill />
                  <h3>Available</h3>
                </div>

                <h3>{category.name}</h3>
                <h3>{category.specialty}</h3>
              </div>
            </div>
          ))}
        </div>
        <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className="my-9 bg-blue-300 px-5 py-3 rounded-full w-[10rem]">More</button>
      </div>
    </div>
  );
};

export default TopDoctors;