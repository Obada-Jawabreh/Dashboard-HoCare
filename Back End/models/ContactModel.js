// models/ContactModel.js
const knex = require("./../config/dbConfig");

class Contact {
  static async addContact({ name, email, subject, message, userId }) {
    try {
      const [contactId] = await knex("contact")
        .insert({
          user_id: userId,
          name,
          email,
          subject,
          message,
          created_at: knex.fn.now(),
        })
        .returning("id");

      return { success: true, contactId };
    } catch (error) {
      console.error("Error inserting contact data:", error);
      throw error;
    }
  }
  // -------------------------------------------------------
  static async getAllContacts() {
    try {
      const contacts = await knex("contact").orderBy("created_at", "desc");

      return contacts;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  }
  // -------------------------------------------------------

  static async deleteContact(contactId) {
    try {
      const deletedCount = await knex("contact").where({ id: contactId }).del();

      return deletedCount > 0;
    } catch (error) {
      console.error("Error deleting contact data:", error);
      throw error;
    }
  }
}

module.exports = Contact;
