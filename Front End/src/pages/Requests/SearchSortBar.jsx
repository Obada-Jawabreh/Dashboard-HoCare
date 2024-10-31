import React from 'react';
import { Search, ArrowUpDown } from "lucide-react";

export default function SearchSortBar({ searchTerm, setSearchTerm, toggleSort }) {
  return (
    <div className="mb-6 flex space-x-4">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prim-button"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
      <button
        onClick={() => toggleSort("name")}
        className="flex items-center px-4 py-2 bg-prim-dark text-black hover:bg-hover-button hover:text-white rounded-lg transition-all"
      >
        Sort by Name <ArrowUpDown className="ml-2" size={16} />
      </button>
      <button
        onClick={() => toggleSort("date")}
        className="flex items-center px-4 py-2 bg-prim-dark text-black hover:bg-hover-button hover:text-white rounded-lg transition-all"
      >
        Sort by Date <ArrowUpDown className="ml-2" size={16} />
      </button>
    </div>
  );
}