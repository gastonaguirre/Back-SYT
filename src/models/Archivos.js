const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('archivos', {
    name: {
        type:DataTypes.STRING,
        allowNull: null   },

    descripcion: {
            type:DataTypes.STRING,
            allowNull: null,
        },

    files: {
          type: DataTypes.STRING,
          allowNull: true,
        },

  },{timestamps: false});
};