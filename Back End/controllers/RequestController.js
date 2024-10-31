// controllers/RequestController.js
const Requests = require("../models/RequestModel");
const knex = require("./../config/dbConfig");
const fs = require("fs");
const path = require("path");
require("dotenv").config();


// ----------------------------------------------------------------------------
exports.GetAllReq = async (req, res) => {
  try {
    const Data = await Requests.GetAllReq();
    res.status(200).json({ data: Data });
  } catch (error) {
    console.error("Error fetching GetAllReq:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
// ----------------------------------------------------------------------------
exports.updateStatusApplicant = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedRequest = await Requests.updateStatusApplicant(id, updatedData);
    res
      .status(200)
      .json({ message: "Request updated successfully", data: updatedRequest });
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
