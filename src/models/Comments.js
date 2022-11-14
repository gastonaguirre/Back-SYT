const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('comments', {  
        text: {
          type:DataTypes.STRING,
          allowNull: false,
        }
      },{timestamps: true});
};