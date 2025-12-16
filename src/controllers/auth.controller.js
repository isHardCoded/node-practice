import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import authService from '../services/auth.service.js'

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

class AuthController {
	async register(req, res) {
		try {
			const { username, email, password } = req.body

			if (!username || !email || !password) {
				return res.status(400).json({ message: 'Введите все поля' })
			}

			const user = await authService.register(username, email, password)

			return res.status(201).json({ message: 'Пользователь создан', user })
		} catch (e) {
			if (e.message === 'USER_ALREADY_EXISTS') {
				return res
					.status(400)
					.json({ message: 'Такой пользователь уже существует' })
			}

			return res.status(500).json({ message: e.message })
		}
	}

	async login(req, res) {
		try {
			const { username, password } = req.body

			if (!username || !password) {
				return res.status(400).json({ message: 'Заполните все поля' })
			}

			const user = await authService.login(username)
			const valid = await bcrypt.compare(password, user.password)

			if (!valid) {
				return res
					.status(400)
					.json({ message: 'Неверное имя пользователя или пароль' })
			}

			const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '7d' })

			return res.json({ token })
		} catch (e) {
			if (e.message === 'USER_NOT_FOUND') {
				return res
					.status(400)
					.json({ message: 'Неверное имя пользователя или пароль' })
			}

			return res.status(500).json({ message: 'Ошибка сервера' })
		}
	}
}

export default new AuthController()
