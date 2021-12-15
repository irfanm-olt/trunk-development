module.exports = function (sequelize, Sequelize) {

  const tableName = 'customerDocuments';
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
    DocumentPath: {
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
