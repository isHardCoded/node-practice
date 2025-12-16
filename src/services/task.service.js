import db from '../models/index.js'
const { Task } = db

class TaskService {
	async getAllTasks() {
		const tasks = await Task.findAll()

		if (!tasks) {
			throw new Error('TASKS_NOT_FOUND')
		}

		return tasks
	}

	async getTaskById(id) {
		const task = await Task.findOne({
			where: { id },
		})

		if (!task) {
			throw new Error('TASK_NOT_FOUND')
		}

		return task
	}

	async createTask(title, description, userId) {
		return await Task.create({ title, description, userId })
	}

	async updateTask(id, userId, body) {
		const task = await Task.findOne({
			where: { id, userId },
		})

		if (!task) {
			throw new Error('TASK_NOT_FOUND')
		}

		await task.update(body)
		return task
	}

	async deleteTask(id) {
		const task = await Task.findByPk(id)

		if (!task) {
			throw new Error('TASK_NOT_FOUND')
		}
		await task.destroy()
	}

	async deleteAllTasks(userId) {
		const tasks = await Task.findAll({ where: userId })

		if (!tasks) {
			throw new Error('TASKS_NOT_FOUND')
		}

		await Task.destroy({
			where: {
				userId: userId,
			},
		})
	}
}

export default new TaskService()
