import { Link, useNavigate } from "react-router-dom";
import { FaCode, FaComments, FaLink, FaRobot } from "react-icons/fa";
import { UserContext } from "../context/user.context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-hot-toast'

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState([]);
  const [project, setProject] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!user && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [user, setUser]);

  async function fetchProjects() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication error! Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/api/project/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response)
      setProject(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch projects.");
    }
  }


  useEffect(() => {
    fetchProjects();
  }, [navigate]);

  async function createProject(e) {
    e.preventDefault();
    // console.log( projectName ,user)

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication error! Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/project/create",
        {
          name: projectName,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log(response);
      if (response.status === 201) {
        // setProject([...project, response.data]);
        setIsModalOpen(false);
        setProjectName("");
        toast.success('Project created successfully!')
        fetchProjects()
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create project.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 py-4 text-white flex flex-col items-center justify-center px-6">
      {/* Header */}
      <h1 className="text-8xl font-bold text-center mb-4">
        Welcome to <span className="text-blue-400">CodeChat AI</span>
      </h1>
      <p className="text-gray-400 text-2xl text-center max-w-xl">
        Chat with others in real-time and get AI-powered code generation &
        editing assistance.
      </p>

      {/* Feature Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {/* Chat Feature */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaComments className="text-blue-400 text-4xl mb-3" />
          <h2 className="text-3xl font-semibold">Real-Time Chat</h2>
          <p className="text-gray-400 text-center mt-2">
            Connect with other developers and collaborate in real time.
          </p>
        </div>

        {/* AI Code Helper Feature */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaRobot className="text-green-400 text-4xl mb-3" />
          <h2 className="text-3xl font-semibold">AI Code Helper</h2>
          <p className="text-gray-400 text-center mt-2">
            Ask AI to generate new code snippets for your projects.
          </p>
        </div>

        {/* Code Editing Feature */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaCode className="text-purple-400 text-4xl mb-3" />
          <h2 className="text-3xl font-semibold">Code Editing</h2>
          <p className="text-gray-400 text-center mt-2">
            Improve or debug your existing code with AI assistance.
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      {user ? (
        <div className="mt-6 text-gray-400 flex flex-row gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="project h-16 mt-8 p-4 border border-slate-300 flex flex-row gap-4 items-center font-bold text-white cursor-pointer rounded-md"
          >
            New Project
            <FaLink />
          </button>

          

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center gap-4 bg-black bg-opacity-50">
              <div className="w-60 flex flex-col gap-2">
          {project.map((project) => (
            <div
              key={project._id}
              onClick={() => {
                navigate(`/project`, {
                  state: { project },
                });
              }}
              className="project flex flex-col gap-2 cursor-pointer p-2 border border-slate-300 rounded-md min-w-52 hover:bg-slate-200"
            >
              <h2 className="font-semibold">{project.name}</h2>

              <div className="flex gap-2">
                {/* <p>
                  {" "}
                  <small>
                    {" "}
                    <i className="ri-user-line"></i> Collaborators
                  </small>{" "}
                  :
                </p> */}
                {/* {project.users.length} */}
              </div>
            </div>
          ))}

          </div>
              <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                <h2 className="text-xl mb-4">Create New Project</h2>
                <form onSubmit={createProject}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Project Name
                    </label>
                    <input
                      onChange={(e) => setProjectName(e.target.value)}
                      value={projectName}
                      type="text"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 text-gray-400 flex flex-row gap-4">
          <Link
            to="/login"
            className="bg-black font-bold cursor-pointer text-xl text-white px-4 py-2 rounded mt-2"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-black font-bold cursor-pointer text-xl text-white px-4 py-2 rounded mt-2"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
