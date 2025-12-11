import db from '../models/index.js'
const { Task } = db;

export async function getAllTasks(req, res) {
  const tasks = await Task.findAll()
  return res.json({ data: tasks })
}

export async function getTaskById(req, res) {
  const { id } = req.params
  const task = await Task.findByPk(id);

  if (!task) {
    return res.status(404).json({ message: 'Задача не найдена'})
  }

  return res.json({ data: task })
}

export async function createTask(req, res) {
  const { title, description } = req.body

  if (!title) {
    return res.status(400).json({ error: "Заполните заголовок" })
  } 

  const task = await Task.create({ title, description })

  return res.status(201).json({ data: task })
}

export async function updateTask(req, res) {
  const { id } = req.params

  const task = await Task.findByPk(id)

  if (!task) {
    return res.status(404).json({ message: "Задача не найдена"})
  }

  const { title, description, completed } = req.body

  await task.update({ title, description, completed })
  return res.json({ data: task })
}

export async function deleteTask(req, res) {
  const { id } = req.params
  
  const task = await Task.findByPk(id)

  if (!task) {
    return res.status(404).json({ message: "Задача не найдена"})
  }

  await task.destroy()

  return res.json({ message: "Задача удалена"})
}

export async function deleteAllTasks(req, res) {
  await Task.destroy({
    where: {},
  });

  return res.json({ message: "Все задачи удалены"})
}