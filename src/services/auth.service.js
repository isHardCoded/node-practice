import db from '../models/index.js'
import bcrypt from 'bcrypt'

const { User } = db

class AuthService {
	async register(username, email, password) {
		const existsUser = await User.findOne({
			where: { username, email },
		})

		if (existsUser) {
			throw new Error('USER_ALREADY_EXISTS')
		}

		const hash = await bcrypt.hash(password, 10)
		return await User.create({ username, email, password: hash })
	}

	async login(username) {
		const user = await User.findOne({
			where: { username },
		})

		if (!user) {
			throw new Error('USER_NOT_FOUND')
		}

		return user
	}
}

export default new AuthService()
