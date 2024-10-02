const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')
dotenv.config()

// Initialize Sequelize instance for MySQL
const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.DB_PASSWORD , {
  host: '127.0.0.1',
  dialect: 'mysql'
});


sequelize.authenticate()
  .then(() => console.log('Connected to MySQL'))
  .catch(err => console.error('Unable to connect:', err));

module.exports = sequelize;

