import db from '../models/index.js'
const { Task } = db;

export async function getAllTasks(req, res) {
  const tasks = await Task.findAll()
  return res.json({ data: tasks })
}