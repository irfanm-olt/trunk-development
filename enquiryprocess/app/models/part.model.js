module.exports = function (sequelize, Sequelize) {

  const tableName = 'parts';
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
    PartsectionID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Name: {
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
