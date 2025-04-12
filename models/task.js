const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const User = require('./user');

const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('pending', 'in-progress', 'completed'), defaultValue: 'pending' },
  dueDate: { type: DataTypes.DATE, allowNull: false },
});

User.hasMany(Task);
Task.belongsTo(User);

module.exports = Task;
