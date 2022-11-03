const { DataTypes, UUIDV4 } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "users",
    {
      // id:{
      //   type:DataTypes.INTEGER,
      //   autoIncrement:true,
      //   allowNull: false,
      //   primaryKey: true
      // },
      usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      contraseña: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      foto_principal: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      foto_portada: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      socials_links: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    },

    {
      paranoid: true,
      timestamps: false
    }
  );
};

