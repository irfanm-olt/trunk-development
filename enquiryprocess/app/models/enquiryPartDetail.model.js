module.exports = function (sequelize, Sequelize) {

  const tableName = 'enquiryPartDetails';
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
    PartheaderID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Brand: {
      type: Sequelize.STRING,
      allowNull: false
    },
    CostPrice: {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: false
    },
    SellingPrice: {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: false
    },
    ProductNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Remark: {
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
