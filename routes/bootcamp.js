const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("bootcamp server is up");
});

// export the module
module.exports = router;
