const { DataTypes, UUIDV4 } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "posts",
    {
      // id:{
      //   type:DataTypes.INTEGER,
      //   autoIncrement:true,
      //   allowNull: false,
      //   primaryKey: true
      // },
      titulo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      texto: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      media: {
        type: DataTypes.STRING,
      },
      url:{
        type:DataTypes.STRING
      }
    },
    { timestamps: true }
  );
};
