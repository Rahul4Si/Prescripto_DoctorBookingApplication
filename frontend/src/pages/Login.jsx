
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("signUp");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const {email,password} = formData
      const response = await axios.post("http://localhost:8000/api/user/loginUser", {email,password});
      if (response.data.success) {
        localStorage.setItem('userImage',response.data.user[0].image)
        localStorage.setItem('userName',response.data.user[0].name)
        localStorage.setItem('token',response.data.token)
        formData.email = ''
        formData.password = ''  
        toast.success(response.data.message);
        navigate('/')
        window.location.reload()
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCreateAccount = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const {fullName,email,password} = formData
      const response = await axios.post("http://localhost:8000/api/user/registerUser", {name:fullName,email,password});
      if (response.data.success) {
        formData.email = ''
        formData.password = ''  
        formData.fullName = ''
        setState('login')
        toast.success(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-40 p-6 bg-white/30 backdrop-blur-md rounded-lg shadow-lg w-[30rem] mx-auto my-10 ">
        <div className="ml-[-1rem]">
          <h1 className="text-2xl font-bold mb-6">
            {state === "login" ? "Login" : "Create Account"}
          </h1>
          <h2 className="text-xl mb-6">
            {state === "login"
              ? "Please log in to book appointment"
              : "Please sign up to book appointment"}
          </h2>
        </div>

        <form
          className="bg-white p-6 rounded  w-full max-w-sm"
        >
          {state === "signUp" && (
            <div className="mb-4">
              <label className="block text-gray-700">Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          {state === "login" ? (
            <button
              type="submit"
              onClick={handleLogin}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full mt-4"
            >
              Login
            </button>
          ) : (
            <button
            type="submit"
            onClick={handleCreateAccount}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full mt-4"
          >
            Create Account
          </button>
          )}
        </form>
        <div>
          {state === "login"
            ? "Create a new account? "
            : "Already have an account? "}
          <button
            onClick={() => setState(state === "login" ? "signUp" : "login")}
            className="mt-1 text-blue-500 hover:underline"
          >
            Switch to {state === "login" ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;