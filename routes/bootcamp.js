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

// includes other resource router
const courseRouter = require('./courses');

const router = express.Router();

// re-route into other resource router
router.use('/:bootcampId/courses',courseRouter)

// routing with controllers
router
  .route("/radius/:zipcode/:distance")
  .get(getBootcampsInRadius);

router.route('/:id/photo').put(bootcampPhotoUpload)

router
  .route("/")
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

// export the module
module.exports = router;
