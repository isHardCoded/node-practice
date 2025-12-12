import express from 'express'
import taskRoutes from './task.routes.js'
import authRoutes from './auth.routes.js'

const router = express.Router()

router.use('/tasks', taskRoutes)
router.use('/auth', authRoutes)

export default router