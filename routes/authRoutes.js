const express = require("express");
const { login } = require("../controllers/authController");
const router = express.Router();

router.post(
  "/login",
  (req, res, next) => {
    console.log("Login route hit"); // Log ini akan muncul jika rute diakses
    next();
  },
  login
);

module.exports = router;
