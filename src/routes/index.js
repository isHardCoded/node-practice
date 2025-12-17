import express from 'express'
import taskRoutes from './task.js'
import authRoutes from './auth.js'

const router = express.Router()

router.use('/tasks', taskRoutes)
router.use('/auth', authRoutes)

export default router
