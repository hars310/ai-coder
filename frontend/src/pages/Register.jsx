import { useState, useContext } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {UserContext}  from "../context/user.context"; 

function RegisterUser() {
  const { setUser } = useContext(UserContext); 
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!username) {
      toast.error("Username is required.");
      setLoading(false);
      return;
    }
    if (!email) {
      toast.error("Email is required.");
      setLoading(false);
      return;
    }
    if (!password) {
      toast.error("Password is required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/user/register", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success("User registered successfully!");

        localStorage.setItem('token', response.data.token);
        
        setUser(response.data.user);

        
        setTimeout(() => {
          navigate("/login");
        }, 500);

        
        setUserName("");
        setEmail("");
        setPassword("");
      } else {
        toast.error(response.data.message || "Failed to register user.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-900 flex flex-col items-center justify-center h-screen">
      <div className="bg-white flex flex-col p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Register</h1>

        <input
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="mb-2 p-2 border rounded w-80"
        />
        <input
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border rounded w-80"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 border rounded w-80"
        />

        <button
          onClick={handleSubmit}
          className="bg-black cursor-pointer text-white px-4 py-2 rounded mt-2"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
}

export default RegisterUser;
