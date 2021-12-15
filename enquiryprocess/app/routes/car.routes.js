const auth = require("../middleware/auth.js");
const cars = require("../controllers/car.controller.js");

var router = require("express").Router();

// CREATE
router.post("/createCar", auth, cars.create);

// FIND ALL
router.get("/loadCars", auth ,cars.findAll);

// READ
router.post("/loadCar", auth,  cars.read);

// UPDATE
router.post("/updateCar", auth,  cars.update);

// DELETE
router.post("/deleteCar", auth, cars.delete);


//export 
module.exports = router;