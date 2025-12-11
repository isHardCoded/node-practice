import express from 'express'
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask, deleteAllTasks } from '../controllers/task.controller.js'

const router = express.Router()

router.get('/', getAllTasks)
router.get('/:id', getTaskById)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)
router.delete('/', deleteAllTasks)

export default router