const passport = require("passport");
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserProfile,
  logout,
} = require("../controllers/authController");
const { protect, authorize } = require("../middlewares/authMiddleware");
const passwordController = require("../controllers/passwordController");
const jwt = require("jsonwebtoken");

// Existing routes
router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getUserProfile);
router.post("/logout", protect, logout);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  }
);

// Facebook OAuth
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  }
);

// Forgot Password
router.post("/forgot-password", passwordController.forgotPassword);
router.post("/reset-password/:token", passwordController.resetPassword);

module.exports = router;
