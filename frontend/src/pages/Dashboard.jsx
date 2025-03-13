import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaComments, FaRobot, FaCode, FaSignOutAlt, FaUser } from "react-icons/fa";
import { UserContext } from "../context/user.context";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("chat"); // Default tab: Chat
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); // Get user from context

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!user && storedUser) {
      setUser(JSON.parse(storedUser)); 
    } else if (!user && !storedUser) {
      navigate("/login"); 
    }
  }, [user, navigate, setUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); 
    setUser(null); 
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-400 mb-6">CodeChat AI</h1>

          {/* User Info Display */}
          {user && (
            <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-700 rounded-md">
              <FaUser className="text-gray-300 text-lg" />
              <div>
                <p className="text-sm font-semibold">{user.username}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center p-3 w-full rounded-md ${
                activeTab === "chat" ? "bg-blue-500" : "hover:bg-gray-700"
              }`}
            >
              <FaComments className="mr-2" /> Chat
            </button>

            <button
              onClick={() => setActiveTab("ai-helper")}
              className={`flex items-center p-3 w-full rounded-md ${
                activeTab === "ai-helper" ? "bg-green-500" : "hover:bg-gray-700"
              }`}
            >
              <FaRobot className="mr-2" /> AI Code Helper
            </button>

            <button
              onClick={() => setActiveTab("code-editor")}
              className={`flex items-center p-3 w-full rounded-md ${
                activeTab === "code-editor" ? "bg-purple-500" : "hover:bg-gray-700"
              }`}
            >
              <FaCode className="mr-2" /> Code Editor
            </button>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 flex items-center justify-center p-3 rounded-md hover:bg-red-600"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      
      
    </div>
  );
}

export default Dashboard;
