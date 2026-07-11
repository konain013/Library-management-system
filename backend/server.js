const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const issueRoutes = require("./routes/issueRoutes");
const errorhandler = require("./middleware/errorhandler");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/issuebook", issueRoutes);

app.use(errorhandler)

const PORT = process.env.PORT || 3000;

// Database Connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});