module.exports = function (sequelize, Sequelize) {

  const tableName = 'enquiryPartHeaders';
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
    EnquiryID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    ParttypeID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    PartID: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    ManufactureID: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    Quantity: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    PartNumber: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Status: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
  };

  const model = sequelize.define(tableName, attributes, options);
  return model;

};
