import { Sequelize } from "sequelize";

const sequelize = new Sequelize('postgres', 'postgres', 'root', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
})

export default sequelize;