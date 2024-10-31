// models/RequestModel.js
const knex = require("./../config/dbConfig");

class Requests {

  // ---------------------------
  static async GetAllReq() {
    try {
      const UserData = await knex("applicants_requests")
        .join("users", "applicants_requests.user_id", "=", "users.user_id")
        .select(
          "applicants_requests.*",
          "users.firstName",
          "users.lastName",
          "users.email",
          "users.phoneNumber",
          "users.profilePicture",
          "users.aboutMe",
          "users.isApproved"
        );

      return UserData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }
  // ----------------------------------------------------------------------------
  static async updateStatusApplicant(id, updatedData) {
    console.log("User ID being checked:", id);

    try {
      const updatedRequest = await knex("applicants_requests")
        .where({ user_id: id })
        .update({
          status: updatedData.isApproved,
        })
        .returning("*");

      if (updatedRequest.length === 0) {
        throw new Error("No request found to update.");
      }

      await knex("users").where({ user_id: id }).update({
        isApproved: updatedData.isApproved,
      });
    } catch (error) {
      console.error("Error updating request status:", error);
      throw new Error("Error updating request status");
    }
  }
}

module.exports = Requests;
