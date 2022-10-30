const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('categories', {
    
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    },


  },{timestamps: false});
};
