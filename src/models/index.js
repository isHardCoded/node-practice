import sequelize from "../config/database.js";
import Task from "./Task.model.js";

const db = {
  sequelize,
  Task,
}

export default db;