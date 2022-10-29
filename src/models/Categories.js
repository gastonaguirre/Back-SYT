const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('categories', {

    name: {
        type:DataTypes.STRING,
        allowNull: null,
        unique: true
      },

  },{timestamps: false});
};
