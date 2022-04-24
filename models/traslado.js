const { DataTypes } = require('sequelize');
const sequelize=require('../db/connections');

const Traslado = sequelize.define('Traslado', {
    // Model attributes are defined here
    ID_OPERADOR: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ROL: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    NO_CAMION: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ID_CONDUCTOR: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    PLACA: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    PROPIETARIO: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    CARGA_GARRAFAS: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    CARGA_RETORNO: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    PERDIDAS: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    VALOR_PRODUCTO: {
      type: DataTypes.DECIMAL(15,2),
      defaultValue: 0.0
    },
    ENTRADA: {
      type: DataTypes.BOOLEAN,
      defaultValue: true 
    },
    FECHA_ENTRADA: {
      type: DataTypes.DATE,
      allowNull: true 
    },
  }, {
    timestamps: true,
    createdAt:'FECHA_SALIDA',
    updatedAt:'FECHA_MODIFICACION',
    tableName: 'traslados',
    schema: 'dbo'
  });


  module.exports ={
    Traslado
}