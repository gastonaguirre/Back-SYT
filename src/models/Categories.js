const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('categories', {

    // id:{
    //   type:DataTypes.INTEGER,
    //   autoIncrement:true,
    //   allowNull: false,
    //   primaryKey: true
    // },

    name: {
        type:DataTypes.STRING,
        allowNull: null   
      },

  },{timestamps: false});
};
