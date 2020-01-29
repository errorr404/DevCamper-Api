const express = require("express");
const dotenv = require("dotenv");
// bring the route file
const bootcamp = require("./routes/bootcamp");

// load env variable in project
dotenv.config({ path: "./config/config.env" });

const app = express();

// mount the route file to the app
app.use("/api/v1/bootcamp", bootcamp);

const PORT = process.env.PORT || 5000;

// start listning on the port
app.listen(
  PORT,
  console.log(`server is up in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
