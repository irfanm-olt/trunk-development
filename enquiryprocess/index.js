require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
var corsOptions = {
  origin: "http://localhost:8081",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const cars = require("./app/routes/car.routes.js");
const customers = require("./app/routes/customer.routes.js");
const manufactures = require("./app/routes/manufacture.routes.js");
const partSections = require("./app/routes/partSection.routes.js");
const parts = require("./app/routes/part.routes.js");
const enquiryCarDetails = require("./app/routes/enquiryCarDetail.routes.js");
const enquiryPartHeaders = require("./app/routes/enquiryPartHeader.routes.js");
const enquiryPartDetails = require("./app/routes/enquiryPartDetail.routes.js");

app.use("/cars", cars);
app.use("/customers", customers);
app.use("/manufactures", manufactures);
app.use("/partSections", partSections);
app.use("/parts", parts);
app.use("/enquiryCarDetails", enquiryCarDetails);
app.use("/enquiryPartHeaders", enquiryPartHeaders);
app.use("/enquiryPartDetails", enquiryPartDetails);

const db = require("./app/models");
db.sequelize.sync();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
