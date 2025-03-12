import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setMessage("");
    
    if(!email || !password) {
      toast.error("Please fill all the fields.");
      setLoading(false);
      return
    }

    try {
      const response = await axios.post("http://localhost:3000/api/user/login", { 
        email,
        password
      });
      
      // console.log(response)
      if (response.status === 200) {
        toast.success("User Logged in successfully! frontend");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          navigate("/dashboard"); 
        }, 500);
      } else {
        toast.error(response.data.message || "Failed to login user.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong. Try again.");
    }
    
    setLoading(false);
    
  };
  
  return (
    <div className="bg-gray-900 flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white flex flex-col p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
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
        {loading ? "Logging..." : "Login"}
      </button>
      {/* {message && <p className="mt-2 text-red-500">{message}</p>} */}
      </div>
    </div>
  );
}

export default LoginUser;