const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cookieParser = require("cookie-parser");
const expressJwt = require("express-jwt");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
/* app.use(expressJwt(config.get("jwtSecret"))); */

//DB Config
const db = config.get("mongoURI");

//Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//Use Routes
app.use("/api/patients", require("./routes/api/patients"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
