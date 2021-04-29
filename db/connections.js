const Sequelize = require('sequelize');

const sequelize = new Sequelize('aitecdb1', 'acaditec', '1668822Lp', {
  host: 'acaditecserver.database.windows.net',
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    encrypt: true
  }
});
module.exports=sequelize;