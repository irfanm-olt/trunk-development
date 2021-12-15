const users = require("../controllers/user.controller.js");

var router = require("express").Router();

// CREATE
router.post("/register", users.register);

// FIND ALL
router.post("/login", users.login);


//export 
module.exports = router;