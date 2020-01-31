const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require('colors');
const connectDB = require("./config/db");
const logger = require("./middleware/logger");

// bring the route file
const bootcamp = require("./routes/bootcamp");

// load env variable in project
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();

const app = express();
/* 
// use the middleware
app.use(logger);
*/

// dev logging middleware
if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

// mount the route file to the app
app.use("/api/v1/bootcamps", bootcamp);

const PORT = process.env.PORT || 5000;

// start listning on the port
const server = app.listen(
  PORT,
  console.log(`server is up in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold)
);

// globale handler for unhandled promise rejections

process.on("unhandledRejection", err => {
  console.log(`Error: ${err.message}`.red);
  // close server and exit process
  server.close(() => process.exit(1));
});
