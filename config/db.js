// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('ticket', 'root', '', {
//   host: '127.0.0.1',
//   dialect: 'mysql'
// });

// module.exports = sequelize;

const { Sequelize } = require('sequelize');

// Initialize Sequelize instance for MySQL
const sequelize = new Sequelize('ticket', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql'
});


sequelize.authenticate()
  .then(() => console.log('Connected to MySQL'))
  .catch(err => console.error('Unable to connect:', err));

module.exports = sequelize;

