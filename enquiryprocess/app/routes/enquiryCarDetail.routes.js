const auth = require("../middleware/auth.js");
const enquiryCarDetails = require("../controllers/enquiryCarDetail.controller.js");

var router = require("express").Router();

// CREATE
router.post("/createEnquiryCarDetails", auth, enquiryCarDetails.create);

//	FIND BY ID
router.post("/getManufactureByID", auth, enquiryCarDetails.findById);

// READ WITH PART HEADERS
router.get("/loadEnquiry", auth, enquiryCarDetails.findPartheaders);

// READ ALL
router.get("/loadEnquiryCarDetails", auth, enquiryCarDetails.findAll);

// READ
router.post("/loadEnquiryCarDetail", auth, enquiryCarDetails.read);

//export 
module.exports = router;