import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

function RegisterUser() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    try {
      const response = await axios.post("http://localhost:3000/api/user/register", {
        username, 
        email,
        password
      });
      
      console.log(response)
      if (response.status === 201) {
        setMessage("User registered successfully! frontend");
        setUserName("");
        setEmail("");
        setPassword("");
        setMessage("")
      } else {
        setMessage("Failed to register User.");
      }
    } catch (error) {
      console.log(error);
      
    }
  
    setLoading(false);
  };
  

  return (
    <div className="bg-zinc-900 flex flex-col items-center justify-center h-screen bg-gray-100">
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
        className="bg-black  cursor-pointer text-white px-4 py-2 rounded mt-2"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
      </div>
    </div>
  );
}

export default RegisterUser;