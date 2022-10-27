const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('users', {

    // id:{
    //   type:DataTypes.INTEGER,
    //   autoIncrement:true,
    //   allowNull: false,
    //   primaryKey: true
    // },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion:{
     type: DataTypes.TEXT,
    }
  },{timestamps: false});
};
