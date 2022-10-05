const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/patients", require("./routes/patients"));
app.use("/api/users", require("./routes/users"));

// Accessing the path module
const path = require("path");

if (process.env.NODE_ENV === "production") {
  // Step 1:
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  // Step 2:
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

const DYNO_URL = "https://easy-soap.herokuapp.com/";

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  /* wakeUpDyno(DYNO_URL); */
});
