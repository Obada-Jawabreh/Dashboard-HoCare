import React from 'react';

export default function FilterBar({ statusFilter, setStatusFilter, professionFilter, setProfessionFilter }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div className="mt-4 md:mt-0 flex flex-wrap gap-52">
        <div className="flex space-x-2">
          {["all", "pending", "approved", "rejected"].map((option) => (
            <button
              key={option}
              onClick={() => setStatusFilter(option)}
              className={`px-4 py-2 rounded-lg transition-all ${
                statusFilter === option
                  ? "bg-prim-button text-white"
                  : "bg-prim-dark text-black hover:bg-hover-button hover:text-white"
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex space-x-2">
          {["all", "Physical Therapist", "Home Nurse"].map((option) => (
            <button
              key={option}
              onClick={() => setProfessionFilter(option)}
              className={`px-4 py-2 rounded-lg transition-all ${
                professionFilter === option
                  ? "bg-prim-button text-white"
                  : "bg-prim-dark text-black hover:bg-hover-button hover:text-white"
              }`}
            >
              {option === "all" ? "All Professions" : option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}