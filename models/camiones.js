const { DataTypes } = require('sequelize');
const sequelize=require('../db/connections');

const Camion = sequelize.define('Camion', {
    // Model attributes are defined here
    MATRICULA: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    MODELO: {
        type: DataTypes.STRING,
      allowNull: true
    },    
    Fecha_Matriculacion: {
        type: DataTypes.DATE,
        allowNull: true 
      },    
    Propietario: {
        type: DataTypes.STRING,
      allowNull: true
    }, 
    ID_CONDUCTOR: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Poliza: {
        type: DataTypes.STRING,
      allowNull: true
    },     
    Fecha_Poliza: {
        type: DataTypes.DATE,
        allowNull: true 
      },
    Renovacion_Poliza: {
        type: DataTypes.BOOLEAN,
        allowNull: true 
      },    
    CAPACIDAD: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ALIAS: {
        type: DataTypes.STRING,
      allowNull: true
    }, 
    COMENTARIO: {
        type: DataTypes.STRING,
      allowNull: true
    }, 
    ID_PROP: {
        type: DataTypes.INTEGER,
       allowNull: true
    },         
  }, {
    timestamps: false,
    tableName: 'camiones',
    schema: 'dbo'
  });


  module.exports ={
    Camion
}