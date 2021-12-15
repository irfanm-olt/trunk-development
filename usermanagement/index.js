require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
var corsOptions = {
  origin: "http://localhost:8081",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./app/config/passport")(passport);
// Routes
const users = require("./app/routes/user.routes.js");
app.use("/users", users);
const db = require("./app/models");
db.sequelize.sync();
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
