// Name convention for controllers: start with the small letters.
const Bootcamp = require("../models/Bootcamp");

// @desc       Get all bootcamps
// @Route      GET api/v1/bootcamps
// @access     Public
exports.getBootcamps = (req, res, next) => {
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
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    // status code -> 201: on creation of new resources.
    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
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
