const Contact = require("../models/ContactModel");

exports.addContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, subject, message } = req.body;
    const emailAuth = req.user.email;

    if (email !== emailAuth) {
      return res.status(201).json({
        success: false,
        message: "The email is incorrect.",
      });
    }

    if (!name || !email || !subject || !message) {
      return res.status(201).json({
        success: false,
        message: "Please fill in all required fields.",
        received: { name, email, subject, message },
      });
    }

    const result = await Contact.addContact({
      name,
      email,
      subject,
      message,
      userId,
    });

    res.status(200).json({
      success: true,
      message: "Contact message added successfully.",
      contactId: result.contactId,
    });
  } catch (error) {
    console.error("Error in addContact:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};
// ------------------------------------------------------
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.getAllContacts();

    res.status(200).json({ data: contacts });
  } catch (error) {
    console.error("Error in getContacts:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};
// ------------------------------------------------------

exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Contact.deleteContact(id);

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Contact deleted successfully.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }
  } catch (error) {
    console.error("Error in deleteContact:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};
