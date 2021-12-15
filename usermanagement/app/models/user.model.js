module.exports = function (sequelize, Sequelize) {

  const tableName = 'users';
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
    Name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    UserType: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Email: {
      type: Sequelize.STRING(64),
      allowNull: false
    },
    Password: {
      type: Sequelize.STRING(64),
      allowNull: false
    },
    Date: {
      type: Sequelize.STRING(32),
      allowNull: true
    },
    Status: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  };

  const model = sequelize.define(tableName, attributes, options);

  return model;

};