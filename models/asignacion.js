const { DataTypes } = require('sequelize');
const sequelize=require('../db/connections');

const Asignacion_role = sequelize.define('Asignacion_role', {
    // Model attributes are defined here
    ID_WORKER: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ID_JOB: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    timestamps: false
  });


  module.exports ={
    Asignacion_role
}