// Name convention for controllers: start with the small letters.
const path = require("path");
const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geoCoder");

// @desc       Get all bootcamps
// @Route      GET api/v1/bootcamps
// @access     Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc       Get single bootcamps
// @Route      GET api/v1/bootcamps/:id
// @access     Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc       Create new bootcamps
// @Route      POST api/v1/bootcamps
// @access     Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  // status code -> 201: on creation of new resources.
  res.status(201).json({ success: true, data: bootcamp });
});

// @desc       Update a bootcamps
// @Route      PUT api/v1/bootcamps/:id
// @access     Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // it returns the updated bootcamp data
    runValidators: true
  });
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc       Delete a bootcamps
// @Route      DELETE api/v1/bootcamps/:id
// @access     Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  bootcamp.remove(); // it will trigger the remove method in pre method.
  res.status(200).json({ success: true, data: {} });
});

// @desc       Get Bootcams within a redius
// @Route      GET api/v1/bootcamps/radius/:zipcode/:distance
// @access     Private
// @Ref        https://docs.mongodb.com/manual/reference/operator/query/centerSphere/
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  //Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // calc radius using radians
  // Divide distance by redius of earth
  // Earth radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] }
    }
  });
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});

// @desc       Upload photo for bootcamps
// @Route      DELETE api/v1/bootcamps/:id/photo
// @access     Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  if (!req.files) {
    return next(new ErrorResponse(`please uplad a file`, 400));
  }

  const file = req.files.file;
  // make sure the file is photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`please uplad an image file`, 400));
  }

  // check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `please uplad an image less then ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  // move file to the path 
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if(err){
      console.error(err)
      return next(
        new ErrorResponse(
          `Problem with file upload`,
          500
        )
      );
    }
    await Bootcamp.findByIdAndUpdate(req.params.id,{photo:file.name});
    res.status(200).json({
      success:true,
      data:file.name
    })
  });
});
