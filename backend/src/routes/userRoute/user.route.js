const express = require("express");
const { LoginUser, registerUser, currentUser } = require("./user.controller");
const { authenticateToken } = require("../../middleware/auth");

const router = express.Router();

router.post("/login", LoginUser);
router.post("/register", registerUser);
router.get("/current", authenticateToken, currentUser);

module.exports = router;
