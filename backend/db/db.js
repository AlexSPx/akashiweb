const models = require('./models')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres://akashiapi:&hZ-]62NN4KstU}N@51.15.107.70:5432/akashitest', {
    dialect: 'postgres'
})

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }