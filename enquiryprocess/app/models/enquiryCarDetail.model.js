module.exports = function (sequelize, Sequelize) {

  const tableName = 'enquiryCarDetails';
  const options = {
    timestamps: true,
    createdAt: 'CreatedOn',
    updatedAt: 'UpdatedOn'
  };

  const attributes = {
    ID: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    CustomerID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    ChassisNO: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ManufactureID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },  
    CarID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Year: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    Variant: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    Status: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
  };

  const model = sequelize.define(tableName, attributes, options);
  return model;

};
