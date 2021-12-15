module.exports = function (sequelize, Sequelize) {

  const tableName = 'customers';
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
    CompanyName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ContactpersonFirstname: {
      type: Sequelize.STRING,
      allowNull: true
    },
    ContactpersonLastname: {
      type: Sequelize.STRING,
      allowNull: true
    },
    ContactpersonMobile: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ContactpersonEmail: {
      type: Sequelize.STRING,
      allowNull: false
    },
    CompanyPhone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Emirates: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    BuildingNO: {
      type: Sequelize.STRING,
      allowNull: true
    },
    street: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Address: {
      type: Sequelize.STRING,
      allowNull: true
    },
    ProfileImage: {
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
