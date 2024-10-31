// controllers/RequestController.js
const User = require("../models/usertModel");
const knex = require("./../config/dbConfig");
const fs = require("fs");
const path = require("path");
require("dotenv").config();


// ------------------------------------GetAllUser----------------------------------------
exports.GetAllUser = async (req, res) => {
  try {
    const Data = await User.getAllUsers();
    res.status(200).json({ data: Data });
  } catch (error) {
    console.error("Error fetching GetAllReq:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
// ---------------------------------toggleIsActive-------------------------------------------

exports.toggleUserStatus = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body; 
  try {
    const response = await User.updateUserStatus(id, isActive);
    if (response) {
      res.status(200).json({
        success: true,
        message: "User status updated successfully",
        isActive: !!isActive, 
      });
    }
  } catch (error) {
    console.error("Error toggling user status:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};