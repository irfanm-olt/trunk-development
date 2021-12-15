const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  dialectOptions: {
    // useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: true,
    timezone: "+05:30"
  },
  timezone: "+05:30", //for writing to database

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


// Models/Tables
db.customer = require("./customer.model")(sequelize, Sequelize);
db.manufactures = require("./manufacture.model.js")(sequelize, Sequelize);
db.cars = require("./car.model.js")(sequelize, Sequelize);
db.partSections = require("./partSection.model.js")(sequelize, Sequelize);
db.parts = require("./part.model.js")(sequelize, Sequelize);
db.enquiryCarDetails = require("./enquiryCarDetail.model.js")(sequelize, Sequelize);
db.enquiryPartHeaders = require("./enquiryPartHeader.model.js")(sequelize, Sequelize);
db.enquiryPartDetails = require("./enquiryPartDetail.model.js")(sequelize, Sequelize);
db.enquiryPartTypes = require("./enquiryPartType.model.js")(sequelize, Sequelize);
db.emirates = require("./emirate.model.js")(sequelize, Sequelize);
db.suitabilities = require("./suitabilitie.model.js")(sequelize, Sequelize);
db.customerDocuments = require("./customerDocument.model.js")(sequelize, Sequelize);


// Relations
db.cars.belongsTo(db.manufactures, { foreignKey: 'ManufactureID'});
db.manufactures.hasMany(db.cars, { foreignKey: 'ManufactureID'});
db.parts.belongsTo(db.partSections, { foreignKey: 'PartsectionID'});
db.partSections.hasMany(db.parts, { foreignKey: 'PartsectionID'});

db.enquiryCarDetails.belongsTo(db.customer, { foreignKey: 'CustomerID' });
db.customer.hasMany(db.enquiryCarDetails,  { foreignKey: 'CustomerID' });

db.enquiryCarDetails.belongsTo(db.cars, { foreignKey: 'CarID' });
db.cars.hasMany(db.enquiryCarDetails,  { foreignKey: 'CarID' });

db.enquiryCarDetails.belongsTo(db.manufactures, { foreignKey: 'ManufactureID' });
db.manufactures.hasMany(db.enquiryCarDetails,  { foreignKey: 'ManufactureID' });

db.enquiryPartHeaders.belongsTo(db.enquiryCarDetails, { foreignKey: 'EnquiryID' });
db.enquiryCarDetails.hasMany(db.enquiryPartHeaders, { foreignKey: 'EnquiryID' });

db.enquiryPartHeaders.belongsTo(db.parts, { foreignKey: 'PartID' });
db.parts.hasMany(db.enquiryPartHeaders, { foreignKey: 'PartID' });

db.enquiryPartHeaders.belongsTo(db.enquiryPartTypes, { foreignKey: 'ParttypeID'});
db.enquiryPartTypes.hasMany(db.enquiryPartHeaders, { foreignKey: 'ParttypeID' });

db.enquiryPartDetails.belongsTo(db.enquiryPartHeaders, { foreignKey: 'PartheaderID' });
db.enquiryPartHeaders.hasMany(db.enquiryPartDetails, { foreignKey: 'PartheaderID' });

db.enquiryPartHeaders.belongsTo(db.manufactures, { foreignKey: 'ManufactureID'});
db.manufactures.hasMany(db.enquiryPartHeaders, { foreignKey: 'ManufactureID' });



module.exports = db;