const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const auth = require("./../middleware/authMiddleware");
const upload = require("../config/multer-config");

router.get("/get", contactController.getContacts);
router.delete('/del/:id', contactController.deleteContact);
module.exports = router;
