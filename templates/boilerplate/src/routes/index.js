const express = require("express");
const { getHome } = require("../controllers/homeController");

const router = express.Router();

// Define routes
router.get("/", getHome);

module.exports = router;
