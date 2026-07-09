const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users", authMiddleware, authorize("admin"), getUsers);

router.get("/profile", authMiddleware, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Profile accessed",
    user: req.user,
  });
});

router.get("/:id", authMiddleware, authorize("admin"), getUserById);

router.delete("/:id", authMiddleware, authorize("admin"), deleteUser);

module.exports = router;