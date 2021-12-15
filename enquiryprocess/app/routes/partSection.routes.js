const auth = require("../middleware/auth.js");
const partSections = require("../controllers/partSection.controller.js");

var router = require("express").Router();

// CREATE
router.post("/createPartSection", auth, partSections.create);

// FIND ALL WITH PARTS
router.get("/loadPartSection", auth, partSections.findPartSectionwithParts);

// FIND ALL
router.get("/loadParts", auth, partSections.findAll);

// READ
router.post("/loadPartSection", auth, partSections.read);

// UPDATE
router.post("/updatePartSection", auth, partSections.update);

// DELETE
router.post("/deletePartSection", auth, partSections.delete);


//export 
module.exports = router;