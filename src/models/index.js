import sequelize from "../config/database.js";
import Task from "./Task.model.js";
import User from './User.model.js'

const db = {
  sequelize,
  Task,
  User,
}

export default db;