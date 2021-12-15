module.exports = function (sequelize, Sequelize) {

  const tableName = 'cars';
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
    ManufactureID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    CarName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Status: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
  };

  const model = sequelize.define(tableName, attributes, options);
  return model;

};
