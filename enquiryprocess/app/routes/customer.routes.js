const auth = require("../middleware/auth.js");
const customers = require("../controllers/customer.controller.js");

var router = require("express").Router();

// CREATE
router.post("/createCustomer", auth, customers.create);

// FIND ALL
router.get("/loadCustomer", auth, customers.findAll);

// READ
router.post("/loadCustomers", auth, customers.read);

// DELETE
router.post("/deleteCustomer", auth, customers.delete);


//export 
module.exports = router;