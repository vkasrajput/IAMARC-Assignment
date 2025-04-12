const sequelize = require('../db/connection');
const User = require('./user');
const Task = require('./task');

module.exports = { sequelize, User, Task };
