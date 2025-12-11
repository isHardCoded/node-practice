import express from 'express'
import { getAllTasks } from '../controllers/task.controller.js'

const router = express.Router()

router.get('/', getAllTasks)

export default router