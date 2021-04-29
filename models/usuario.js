const { DataTypes } = require('sequelize');
const sequelize=require('../db/connections');

const Usuario = sequelize.define('User', {
    // Model attributes are defined here
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    G_Sync: {
      type: DataTypes.BOOLEAN,
      allowNull: false 
    },
  }, {
    timestamps: false
  });


  module.exports ={
    Usuario
}