// @desc  Log request console

const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next(); // it's for executing the next things
};

module.exports = logger;
