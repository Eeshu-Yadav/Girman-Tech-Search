import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const Modal = ({ user, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-2">Fetch Details</h2>
        <p className="text-gray-600 mb-4">Here are the details of the employee:</p>
        <div>
          <p>
            <strong>Name:</strong> {user.first_name} {user.last_name}
          </p>
          <p>
            <strong>Location:</strong> {user.city}
          </p>
          <p>
            <strong>Contact Number:</strong> {user.contact_number}
          </p>
          <p className="mt-2">
            <strong>Profile Image:</strong>
          </p>
          <img
            src={user.avatar || "src/assets/profile.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full mt-2 object-cover"
          />
        </div>
        <button
          className="mt-6 bg-white text-black border border-black px-4 py-2 rounded-md hover:bg-black hover:text-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchUsers = async () => {
    if (search.trim() === "") {
      // Clear users and reset state if the search is empty
      setUsers([]);
      setError("");
      setHasSearched(false);
      return;
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/search/", {
        params: { query: search },
      });
      setUsers(response.data.results);
      setError("");
    } catch (err) {
      setUsers([]);
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setHasSearched(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchUsers();
    }
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim() === "") {
      setUsers([]);
      setError("");
      setHasSearched(false);
    }
  };

  const handleFetchDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-blue-50 font-sans">
      <header className="w-full flex items-center justify-between px-16 py-6 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          <img src="src/assets/icon.svg" alt="Girman Logo" className="w-[60px] h-[60px]" />
          <div>
            <div className="text-[37.23px] font-bold leading-[42.17px] font-poppins">Girman</div>
            <div className="text-[11.24px] font-semibold leading-[16.87px] tracking-[0.4em] font-poppins">
              TECHNOLOGIES
            </div>
          </div>
        </div>
        <nav className="flex space-x-8 text-lg font-medium">
          <a href="#search" className="text-blue-600 font-bold">
            SEARCH
          </a>
          <a href="https://girmantech.com/" className="hover:text-blue-600">
            WEBSITE
          </a>
          <a
            href="https://www.linkedin.com/company/girmantech/"
            className="hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            LINKEDIN
          </a>
          <a href="mailto:contact@girmantech.com" className="hover:text-blue-600">
            CONTACT
          </a>
        </nav>
      </header>

      <main className="flex flex-col items-center mt-8 w-full">
        {search.trim() === "" && !hasSearched && (
          <div className="flex items-center space-x-4">
            <img src="src/assets/Group 1.svg" alt="Large Girman Logo" className="w-[110px] h-[110px]" />
            <div className="text-[110px] font-bold leading-[110px] font-poppins">Girman</div>
          </div>
        )}

        <div className="relative w-[800px] mb-8">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, city, or contact number..."
            value={search}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="w-full h-[50px] pl-12 pr-4 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-4/5">
          {hasSearched && users.length === 0 && (
            <div className="flex flex-col items-center mt-4 col-span-full">
            <img
              src="src/assets/no_result.svg" // Update this with the correct path to your image
              alt="No results found"
              className="w-48 h-48"
            />
            <p className="text-gray-500 mt-4 text-lg">No results found.</p>
          </div>
          )}

          {users.length > 0 &&
            users.map((user, index) => (
              <div
                key={index}
                className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center"
              >
                <img
                  src={user.avatar || "src/assets/profile.png"}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h2 className="text-xl font-bold">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-gray-500 mb-2">
                  <span className="flex items-center">
                   <img
                  src="src/assets/location-pin.png"
                  alt="Location"
                  className="h-5 w-5 mr-2"
                  style={{ filter: "brightness(0) saturate(100%) invert(34%) sepia(13%) saturate(459%) hue-rotate(152deg) brightness(95%) contrast(85%)" }}
                  />
                  {user.city}
                  </span>
                </p>
                <p className="text-gray-700 flex items-center">
                 <img
                  src="src/assets/call.png"
                  alt="Location"
                  className="h-5 w-5 mr-2"
                  />
                  {user.contact_number}
                </p>
                <p className="text-gray-500 text-sm mt-1">Available on phone</p>
                <button
                  className="bg-black text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-800"
                  onClick={() => handleFetchDetails(user)}
                >
                  Fetch Details
                </button>
              </div>
            ))}
        </div>
      </main>

      <Modal user={selectedUser} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default App;