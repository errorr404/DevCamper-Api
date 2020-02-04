const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require("../controllers/bootcamps");
// import the modal
const Bootcamp = require('../models/Bootcamp');

// includes other resource router
const courseRouter = require('./courses');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');

// re-route into other resource router
router.use('/:bootcampId/courses',courseRouter)

// routing with controllers
router
  .route("/radius/:zipcode/:distance")
  .get(getBootcampsInRadius);

router.route('/:id/photo').put(bootcampPhotoUpload)

router
  .route("/")
  .get(advancedResults(Bootcamp, 'courses'),getBootcamps)
  .post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

// export the module
module.exports = router;
