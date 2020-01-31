// Name convention for controllers: start with the small letters.
const Bootcamp = require("../models/Bootcamp");

// @desc       Get all bootcamps
// @Route      GET api/v1/bootcamps
// @access     Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({ success: true, data: bootcamps });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc       Get single bootcamps
// @Route      GET api/v1/bootcamps/:id
// @access     Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
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
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // it returns the updated bootcamp data
      runValidators: true
    });
    if (!bootcamp) {
      return res.send(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    res.send(400).json({ success: false });
  }
};

// @desc       Delete a bootcamps
// @Route      DELETE api/v1/bootcamps/:id
// @access     Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.send(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.send(400).json({ success: false });
  }
};
