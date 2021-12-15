const auth = require("../middleware/auth.js");
const enquiryPartHeaders = require("../controllers/enquiryPartHeader.controller.js");

var router = require("express").Router();

// CREATE
router.post("/createEnquiryPartHeader", auth, enquiryPartHeaders.create);

// READ
router.post("/loadEnquiryPartHeader", auth, enquiryPartHeaders.read);

// UPDATE
router.post("/addPartNumber", auth, enquiryPartHeaders.addPartNumber);

//export 
module.exports = router;