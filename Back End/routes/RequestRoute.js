const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/RequestController");
const auth = require("../middleware/authMiddleware");
const upload = require("../config/multer-config");

router.put("/update/:id", applicationController.updateStatusApplicant);

router.get("/get", applicationController.GetAllReq);
module.exports = router;
