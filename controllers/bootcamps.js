// @desc       Get all bootcamps
// @Route      GET api/v1/bootcamps
// @access     Public
exports.getBootcamps = (req, res, next) => {
  console.log("i m here");
  res.status(200).json({ success: true, msg: "show all bootcamps" });
};

// @desc       Get single bootcamps
// @Route      GET api/v1/bootcamps/:id
// @access     Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `show bootcamp ${req.params.id}` });
};

// @desc       Create new bootcamps
// @Route      POST api/v1/bootcamps
// @access     Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: "create a new bootcamps" });
};

// @desc       Update a bootcamps
// @Route      PUT api/v1/bootcamps/:id
// @access     Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `update bootcamp ${req.params.id}` });
};

// @desc       Delete a bootcamps
// @Route      DELETE api/v1/bootcamps/:id
// @access     Private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `delete bootcamp ${req.params.id}` });
};
