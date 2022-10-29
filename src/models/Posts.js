const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('posts', {

    // id:{
    //   DataTypes.UUID,
    //   autoIncrement:true,
    //   allowNull: false,
    //   primaryKey: true
    // },

    titulo: {
        type:DataTypes.STRING,
        allowNull: true
    },

    texto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    
    media: {
        type: DataTypes.STRING
    },

    foto:{
     type: DataTypes.TEXT,
    },

  },{timestamps: false});
};
