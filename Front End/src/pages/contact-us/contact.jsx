import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Search,
  ChevronDown,
  ChevronUp,
  Trash2,
  Eye,
} from "lucide-react";
import useFetchData from "../../components/customHooks/get";
import axios from "axios";
const ContactMessages = () => {
  const {
    data: contactsData,
    loading: contactsDataLoading,
    error: contactsDataError,
  } = useFetchData("contact", "get");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [sortField, setSortField] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("desc");

  const messages = contactsData;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleMessageView = (message) => {
    if (selectedMessage?.id === message.id) {
      setSelectedMessage(null);
    } else {
      setSelectedMessage(message);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5002/api/contact/del/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log("Message deleted successfully:", response.data.message);
      } else {
        console.error("Failed to delete message:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMessages = [...filteredMessages].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  if (contactsDataLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-prim-button"></div>
      </div>
    );
  }

  if (contactsDataError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error loading messages: {contactsDataError.message}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-prime-white min-h-screen"
    >
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Contact Messages</h1>
        <p className="text-gray-600">
          Manage and respond to contact form submissions
        </p>
      </div>

      {/* Stats Section */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="max-w-sm mb-8 bg-prim-dark p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 mb-1">Total Messages</p>
            <h3 className="text-3xl font-bold text-black">{messages.length}</h3>
          </div>
          <div className="bg-prim-button p-4 rounded-lg">
            <MessageSquare className="text-white" size={28} />
          </div>
        </div>
      </motion.div>

      {/* Search Section */}
      <div className="bg-prim-dark p-6 rounded-xl shadow-lg mb-8">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-prim-button transition-colors"
          />
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-prim-dark rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th
                  className="px-6 py-4 text-left cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    <span>Sender</span>
                    {sortField === "name" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("subject")}
                >
                  <div className="flex items-center">
                    <span>Subject</span>
                    {sortField === "subject" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("created_at")}
                >
                  <div className="flex items-center">
                    <span>Date</span>
                    {sortField === "created_at" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedMessages.map((message) => (
                <React.Fragment key={message.id}>
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-prim-button rounded-full flex items-center justify-center text-white">
                          {message.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">
                            {message.name}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {message.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p>{message.subject}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-500">
                        {new Date(message.created_at).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleMessageView(message)}
                          className="p-2 rounded-lg text-blue-500 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                        >
                          <Eye size={20} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteMessage(message.id)}
                          className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                        >
                          <Trash2 size={20} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                  {selectedMessage?.id === message.id && (
                    <motion.tr
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <td colSpan="4" className="px-6 py-4 bg-gray-50">
                        <div className="rounded-lg p-4 bg-white">
                          <h4 className="font-semibold mb-2">Message:</h4>
                          <p className="text-gray-600 whitespace-pre-wrap">
                            {message.message}
                          </p>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactMessages;
