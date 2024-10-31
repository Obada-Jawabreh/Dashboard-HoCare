import React from "react";
import {
  User,
  Calendar,
  FileText,
  Award,
  Clipboard,
  Check,
  X,
} from "lucide-react";
import Swal from "sweetalert2";
import updateData from "../../components/customHooks/updateData";
import defaultImage from "../../assets/images/defaultImage.png";

export default function ApplicantDetails({ selectedApplicant }) {
  const handleStatusChange = async (id, isApproving) => {
    const action = isApproving ? "approve" : "reject";
    const result = await Swal.fire({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Application?`,
      text: `Are you sure you want to ${action} this application?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#46808B",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await updateData("request", id, {
          isApproved: isApproving,
        });

        if (response && response.data) {
          Swal.fire({
            icon: "success",
            title: "Updated Successfully",
            text: `Application has been ${
              isApproving ? "approved" : "rejected"
            }.`,
          });
        }
      } catch (error) {
        console.error("Error updating the applicant's status:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.message ||
            "There was an error updating the application status.",
        });
      }
    }
  };

  const getStatusBadge = (isApproved) => {
    if (isApproved === null)
      return (
        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
          Pending Review
        </span>
      );
    if (isApproved === true)
      return (
        <span className="bg-prim-button text-white px-3 py-1 rounded-full text-sm">
          Approved
        </span>
      );
    return (
      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
        Rejected
      </span>
    );
  };

  if (!selectedApplicant) {
    return (
      <div className="lg:w-3/5 bg-prim-dark rounded-xl p-6 flex items-center justify-center h-full">
        <p className="text-black text-lg">
          Select an application to view details
        </p>
      </div>
    );
  }

  return (
    <div className="lg:w-3/5">
      <div className="bg-prim-dark rounded-xl p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <img
              src={`http://localhost:5001/${selectedApplicant.profilePicture}`}
              alt={selectedApplicant.firstName}
              className="w-20 h-20 rounded-full border-4 border-prim-button"
              onError={(e) => {
                e.target.src = defaultImage;
              }}
            />
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-black">
                {selectedApplicant.firstName} {selectedApplicant.lastName}
              </h2>
              <p className="text-black opacity-70">
                {selectedApplicant.profession}
              </p>
            </div>
          </div>
          {getStatusBadge(selectedApplicant.isApproved)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-black">
            <User className="mr-2 text-prim-button" size={20} />
            <span>About: {selectedApplicant.aboutMe}</span>
          </div>
          <div className="flex items-center text-black">
            <Calendar className="mr-2 text-prim-button" size={20} />
            <span>
              Applied:{" "}
              {new Date(selectedApplicant.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() =>
              window.open(
                `http://localhost:5001/${selectedApplicant.resume}`,
                "_blank"
              )
            }
            className="flex items-center justify-center p-3 bg-prime-white rounded-lg text-black hover:bg-hover-button hover:text-white transition-all"
          >
            <FileText className="mr-2" size={20} />
            Resume
          </button>
          <button
            onClick={() =>
              window.open(
                `http://localhost:5001/${selectedApplicant.certificate}`,
                "_blank"
              )
            }
            className="flex items-center justify-center p-3 bg-prime-white rounded-lg text-black hover:bg-hover-button hover:text-white transition-all"
          >
            <Award className="mr-2" size={20} />
            Certificate
          </button>
          <button
            onClick={() =>
              window.open(
                `http://localhost:5001/${selectedApplicant.licenseToPractice}`,
                "_blank"
              )
            }
            className="flex items-center justify-center p-3 bg-prime-white rounded-lg text-black hover:bg-hover-button hover:text-white transition-all"
          >
            <Clipboard className="mr-2" size={20} />
            License
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => handleStatusChange(selectedApplicant.user_id, true)}
            className={`flex-1 ${
              selectedApplicant.isApproved === true
                ? "bg-gray-400"
                : "bg-prim-button hover:bg-hover-button"
            } text-white p-3 rounded-lg flex items-center justify-center transition-all`}
            disabled={selectedApplicant.isApproved === true}
          >
            <Check className="mr-2" size={20} />
            {selectedApplicant.isApproved === true
              ? "Approved"
              : "Approve Application"}
          </button>
          <button
            onClick={() => handleStatusChange(selectedApplicant.user_id, false)}
            className={`flex-1 ${
              selectedApplicant.isApproved === false
                ? "bg-gray-400"
                : "bg-red-500 hover:bg-red-600"
            } text-white p-3 rounded-lg flex items-center justify-center transition-all`}
            disabled={selectedApplicant.isApproved === false}
          >
            <X className="mr-2" size={20} />
            {selectedApplicant.isApproved === false
              ? "Rejected"
              : "Reject Application"}
          </button>
        </div>
      </div>
    </div>
  );
}
