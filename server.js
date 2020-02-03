const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/error");
// load env variable in project
dotenv.config({ path: "./config/config.env" });

// bring the route file
const bootcamp = require("./routes/bootcamp");
const courses = require('./routes/courses');


// connect to database
connectDB();

const app = express();

//body-parse
app.use(express.json()); //---> we can use this instead of body-parser pakage

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
app.use('/api/V1/courses', courses)

// to use error handler middleware in bootcamp wo we need to put it after bootcamp router, middlewares are excutes in linear order
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// start listning on the port
const server = app.listen(
  PORT,
  console.log(
    `server is up in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
  )
);

// globale handler for unhandled promise rejections

process.on("unhandledRejection", err => {
  console.log(`Error: ${err.message}`.red);
  // close server and exit process
  server.close(() => process.exit(1));
});
