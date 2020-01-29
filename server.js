const express = require('express');
const dotenv = require('dotenv');

// load env variable in project
dotenv.config({path:'./config/config.env'});

const app = express();

const PORT = process.env.PORT || 5000;

// start listning on the port
app.listen(PORT,console.log(`server is up in ${process.env.NODE_ENV} mode on port ${PORT}`))