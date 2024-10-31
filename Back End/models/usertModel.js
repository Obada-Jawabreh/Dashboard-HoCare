// models/RequestModel.js
const knex = require("./../config/dbConfig");

class User {
  // ---------------------------
  static async getAllUsers() {
    try {
      const userData = await knex("users").select("*");

      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }
  // ----------------------------------------------------------------------------
  static async updateUserStatus(id, isActive) {
    
    try {
      await knex("users")
        .where({ user_id:id })
        .update({ isActive: !!isActive }); 

      return true;
    } catch (error) {
      console.error("Error updating user status in model:", error);
      throw error;
    }
  }
}

module.exports = User;
