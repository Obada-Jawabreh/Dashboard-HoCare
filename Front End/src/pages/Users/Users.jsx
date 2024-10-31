import React, { useState } from "react";
import {
  Search,
  ToggleLeft,
  ToggleRight,
  Mail,
  Phone,
  Filter,
} from "lucide-react";
import get from "../../components/customHooks/get";
import defaultImage from "../../assets/images/defaultImage.png";
import updateData from "../../components/customHooks/updateData";

export default function UsersPage() {
  const { data: users, loading, error } = get("user", "get");

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredUsers = users
    .filter((user) =>
      filter === "all" ? true : user.isActive === (filter === "active")
    )
    .filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phoneNumber.includes(searchTerm)
    );

  const toggleUserStatus = async (userId, currentStatus) => {
    console.log(currentStatus);
    
    try {
      const response = await updateData("user", userId, {
        isActive: !currentStatus
      });
      console.log(response);
      
      if (response) {
        console.log("User status updated successfully");
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <h1 className="text-3xl font-bold text-gray-900">
              Users Management
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>Active: {users.filter((u) => u.isActive).length}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                <span>Inactive: {users.filter((u) => !u.isActive).length}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-grow">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="inline-flex items-center px-4 py-3 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <Filter className="mr-2 text-gray-500" size={20} />
                <span className="text-gray-700">
                  {filter === "all"
                    ? "All Users"
                    : filter === "active"
                    ? "Active Users"
                    : "Inactive Users"}
                </span>
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu">
                    {["all", "active", "inactive"].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setFilter(option);
                          setIsFilterOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        {option === "all"
                          ? "All Users"
                          : option === "active"
                          ? "Active Users"
                          : "Inactive Users"}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.user_id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <img
                      src={`http://localhost:5001/${user.profilePicture}`}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                      onError={(e) => {
                        e.target.src = defaultImage;
                      }}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user.firstName} {user.lastName}
                      </h3>
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                        User
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleUserStatus(user.user_id, user.isActive)}
                    className={`p-2 rounded-full ${
                      user.isActive
                        ? "text-green-600 hover:text-green-700"
                        : "text-red-600 hover:text-gray-500"
                    }`}
                  >
                    {user.isActive ? (
                      <ToggleRight size={24} />
                    ) : (
                      <ToggleLeft size={24} /> 
                    )}
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-500">
                    <Mail size={16} className="mr-2" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Phone size={16} className="mr-2" />
                    <span className="text-sm">{user.phoneNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}