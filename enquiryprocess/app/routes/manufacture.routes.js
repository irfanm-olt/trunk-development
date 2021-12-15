const auth = require("../middleware/auth.js");
const manufactures = require("../controllers/manufacture.controller.js");

var router = require("express").Router();

// CREATE
router.post("/createManufacture", auth, manufactures.create);

// FIND ALL
router.get("/loadManufactures", auth, manufactures.findAll);

// READ
router.post("/loadManufacture", auth, manufactures.read);

// UPDATE
router.post("/updateManufacture", auth, manufactures.update);

// DELETE
router.post("/deleteManufacture", auth, manufactures.delete);


//export 
module.exports = router;