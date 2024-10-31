import React, { useState } from "react";
import get from "../../components/customHooks/get";
import FilterBar from "./FilterBar";
import SearchSortBar from "./SearchSortBar";
import ApplicantsList from "./ApplicantsList";
import ApplicantDetails from "./ApplicantDetails";

export default function TherapistRequests() {
  const { data: Applicants, loading, error } = get("request", "get");
  const [statusFilter, setStatusFilter] = useState("all");
  const [professionFilter, setProfessionFilter] = useState("all");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const filteredAndSortedApplicants = Applicants
    ? Applicants.filter((a) => {
        const matchesStatusFilter =
          statusFilter === "all" ||
          (statusFilter === "pending" && a.isApproved === null) ||
          (statusFilter === "approved" && a.isApproved === true) ||
          (statusFilter === "rejected" && a.isApproved === false);
        const matchesProfessionFilter =
          professionFilter === "all" ||
          a.profession.toLowerCase() === professionFilter.toLowerCase();
        const matchesSearch = a.fullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchesStatusFilter && matchesProfessionFilter && matchesSearch;
      }).sort((a, b) => {
        const compareValue =
          sortCriteria === "name"
            ? a.fullName.localeCompare(b.fullName)
            : new Date(a.created_at) - new Date(b.created_at);
        return sortDirection === "asc" ? compareValue : -compareValue;
      })
    : [];
  const toggleSort = (criteria) => {
    if (sortCriteria === criteria) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortCriteria(criteria);
      setSortDirection("asc");
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="min-h-screen bg-prim-dark p-6 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="bg-prime-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">
                Therapist Applications
              </h1>
              <p className="text-black opacity-70">
                Review and manage therapist applications
              </p>
            </div>
          </div>

          <FilterBar
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            professionFilter={professionFilter}
            setProfessionFilter={setProfessionFilter}
          />

          <SearchSortBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            toggleSort={toggleSort}
          />
          <div className="flex flex-col lg:flex-row gap-6">
            <ApplicantsList
              applicants={filteredAndSortedApplicants}
              selectedApplicant={selectedApplicant}
              setSelectedApplicant={setSelectedApplicant}
            />

            <ApplicantDetails selectedApplicant={selectedApplicant} />
          </div>
        </div>
      </div>
    </div>
  );
}
