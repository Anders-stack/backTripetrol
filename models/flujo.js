const { DataTypes } = require('sequelize');
const sequelize=require('../db/connections');

const Flujo = sequelize.define('Flujo', {
    // Model attributes are defined here
    ID_RAMPLISTA: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FECHA: {
        type: DataTypes.DATE,
        allowNull: false 
    },
    SALIDA: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    ID_CAMION: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ID_CONDUCTOR: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    GARRAFAS_LLENAS: {
        type: DataTypes.INTEGER,
        allowNull: false
    },    
    GARRAFAS_VACIAS: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    VALOR_PRODUCTO: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    },
    ID_CAJERO: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    OK_CAJERO: {
        type: DataTypes.BOOLEAN,
        defaultValue: false 
    },
    FECHA_CAJERO: {
        type: DataTypes.DATE,
        allowNull: true 
    },
    PETICION_CAJERO: {
        type: DataTypes.BOOLEAN,
        defaultValue: true 
    },
    OK_CONDUCTOR: {
        type: DataTypes.BOOLEAN,
        defaultValue: false 
    },
    PETICION_CONDUCTOR: {
        type: DataTypes.BOOLEAN,
        defaultValue: true 
    },
    FECHA_CONDUCTOR: {
        type: DataTypes.DATE,
        allowNull: true 
    },
  }, {
    timestamps: false
  });


  module.exports ={
    Flujo
}