const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('users', {

    id:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      allowNull: false,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("name", ()=>{
            value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        });
      }
    },

    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("apellido", ()=>{
            value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        });
      }
    },

    descripcion:{
     type: DataTypes.TEXT,
    },
  },{timestamps: false});
};