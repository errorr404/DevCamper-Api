//@link: https://www.npmjs.com/package/node-geocoder
const NodeGeocoder = require("node-geocoder");
const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
var geocoder = NodeGeocoder(options);

module.exports = geocoder;
