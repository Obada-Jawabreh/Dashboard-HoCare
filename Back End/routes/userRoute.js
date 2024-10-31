const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");
const upload = require("../config/multer-config");


router.get("/get", userController.GetAllUser)
router.put("/update/:id", userController.toggleUserStatus);
module.exports = router;
