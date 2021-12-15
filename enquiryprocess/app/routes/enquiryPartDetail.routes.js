const auth = require("../middleware/auth.js");
const enquiryPartDetails = require("../controllers/enquiryPartDetail.controller.js");

var router = require("express").Router();

// CREATE
router.post("/createEnquiryPartDeatils", auth, enquiryPartDetails.create);

// FIND ALL
router.post("/loadPartDeatil", auth, enquiryPartDetails.findAll);

// READ
router.post("/loadEnquiryPartDeatils", auth, enquiryPartDetails.read);


//export 
module.exports = router;