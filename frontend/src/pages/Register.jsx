  import { useState } from "react";
  import { Link } from "react-router-dom";
  import axios from 'axios'
  import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

  function RegisterUser() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    // const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      // setLoading(true);
      // setMessage("");

      if(!username || !email || !password) {
        toast.error("Please fill all the fields.");
        setLoading(false);
        return;
      }

  
      try {
        const response = await axios.post("http://localhost:3000/api/user/register", {
          username, 
          email,
          password
        });
        
        // console.log(response)
        if (response.status === 201) {
          toast.success("User registered successfully!");
          // setMessage("User registered successfully! frontend");
          setTimeout(() => {
            navigate("/login"); 
          }, 500);
          setUserName("");
          setEmail("");
          setPassword("");
          // setMessage("")
        } else {
          // setMessage("Failed to register User.");
          toast.error(response.data.message || "Failed to register user.");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong. Try again.");
      }
      // setMessage("");
      setLoading(false);
    };
    

    return (
      <div className="bg-gray-900 flex flex-col items-center justify-center h-screen bg-gray-100">
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
        {/* {message && <p className="mt-2 text-red-500">{message}</p>} */}
        </div>
      </div>
    );
  }

  export default RegisterUser;