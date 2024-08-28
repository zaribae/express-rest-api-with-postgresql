require('dotenv').config();
const { Sequelize } = require('sequelize');
const config = require('./config.js');

const env = process.env.PROJECT_ENV || "development";

const sequelize = new Sequelize(config[env]);

module.exports = { sequelize };

