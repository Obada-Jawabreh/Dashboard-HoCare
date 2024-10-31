import defaultImage from "../../assets/images/defaultImage.png";

export default function ApplicantsList({
  applicants,
  selectedApplicant,
  setSelectedApplicant,
}) {
  const getStatusBadge = (isApproved) => {
    if (isApproved === null)
      return (
        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
          Pending
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

  return (
    <div className="w-full lg:w-2/5 space-y-4 max-h-[calc(100vh-400px)] lg:max-h-[calc(100vh-300px)] overflow-y-auto">
      {applicants.map((applicant) => (
        <div
          key={applicant.request_id}
          onClick={() => setSelectedApplicant(applicant)}
          className={`p-4 rounded-xl cursor-pointer transition-all ${
            selectedApplicant?.request_id === applicant.request_id
              ? "bg-prim-button text-white"
              : "bg-prim-dark hover:bg-hover-button hover:text-white"
          }`}
        >
          <div className="flex items-center">
            <img
              src={`http://localhost:5001/${applicant.profilePicture}`}
              alt={applicant.firstName}
              className="w-12 sm:w-16 h-12 sm:h-16 rounded-full border-2 border-prime-white"
              onError={(e) => {
                e.target.src = defaultImage;
              }}
            />
            <div className="ml-4 flex-grow">
              <h3 className="font-semibold text-sm sm:text-base">
                {applicant.firstName} {applicant.lastName}
              </h3>
              <p className="opacity-80 text-sm">{applicant.profession}</p>
            </div>
            <div className="hidden sm:block">
              {getStatusBadge(applicant.isApproved)}
            </div>
          </div>
          <div className="mt-2 sm:hidden">
            {getStatusBadge(applicant.isApproved)}
          </div>
        </div>
      ))}
    </div>
  );
}
