import taskService from '../services/task.service.js'

class TaskController {
	async getAllTasks(req, res) {
		try {
			const tasks = await taskService.getAllTasks()
			return res.json({ data: tasks })
		} catch (e) {
			if (e.message === 'TASKS_NOT_FOUND') {
				return res.json(404).json({ message: 'Задачи не найдены' })
			}
			return res.json(500).json({ message: 'Ошибка сервера' })
		}
	}

	async getTaskById(req, res) {
		try {
			const id = req.params.id

			const task = await taskService.getTaskById(id)

			return res.json({ data: task })
		} catch (e) {
			if (e.message === 'TASK_NOT_FOUND') {
				return res.status(404).json({ message: 'Задача не найдена' })
			}
			return res.json(500).json({ message: 'Ошибка сервера' })
		}
	}

	async createTask(req, res) {
		try {
			const { title, description } = req.body

			const userId = req.userId

			if (!title) {
				return res.status(400).json({ message: 'Заполните заголовок' })
			}

			const task = await taskService.createTask(title, description, userId)

			return res.status(201).json({ data: task })
		} catch (e) {
			if (e) {
				return res.json(500).json({ message: 'Ошибка сервера' })
			}
		}
	}

	async updateTask(req, res) {
		try {
			const id = req.params.id
			const userId = req.userId
			const body = req.body

			const task = await taskService.updateTask(id, userId, body)

			return res.json({ data: task })
		} catch (e) {
			if (e.message === 'TASK_NOT_FOUND') {
				return res.status(404).json({ message: 'Задача не найдена' })
			}
			return res.json(500).json({ message: 'Ошибка сервера' })
		}
	}

	async deleteTask(req, res) {
		try {
			const id = req.params.id

			await taskService.deleteTask(id)

			return res.json({ message: 'Задача удалена' })
		} catch (e) {
			if (e.message === 'TASK_NOT_FOUND') {
				return res.status(404).json({ message: 'Задача не найдена' })
			}
			return res.json(500).json({ message: 'Ошибка сервера' })
		}
	}

	async deleteAllTasks(req, res) {
		try {
			const userId = req.userId

			await taskService.deleteAllTasks(userId)

			return res.json({ message: 'Все задачи удалены' })
		} catch (e) {
			if (e.message === 'TASKS_NOT_FOUND') {
				return res.json(404).json({ message: 'Задачи не найдены' })
			}
			return res.status(500).json({ message: 'Ошибка сервера' })
		}
	}
}

export default new TaskController()
