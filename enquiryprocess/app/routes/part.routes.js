const auth = require("../middleware/auth.js");
const parts = require("../controllers/part.controller.js");

var router = require("express").Router();

// CREATE
router.post("/createPart", auth, parts.create);

// FIND ALL
router.get("/fetchPartsAll", auth, parts.findAll);

// READ
router.post("/fetchPart", auth, parts.read);

// UPDATE
router.post("/updateParts", auth, parts.update);

// DELETE
router.post("/deleteParts", auth, parts.delete);


//export 
module.exports = router;