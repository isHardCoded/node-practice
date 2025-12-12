import sequelize from "../config/database.js";
import Task from "./Task.model.js";
import User from './User.model.js'

User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" })
Task.belongsTo(User, { foreignKey: "userId" })

const db = {
  sequelize,
  Task,
  User,
}

export default db;