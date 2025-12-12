import db from '../models/index.js'
import bcrypt from 'bcrypt'

const { User } = db

export async function register(req, res) {
	const { username, email, password } = req.body

	if (!username || !email || !password) {
		return res.status(400).json({ message: 'Введите все поля' })
	}

	const existsUser = await User.findOne({
		where: { username, email },
	})

	if (existsUser) {
    return res.status(400).json({ message: "Такой пользователь уже существует" })
  }

  const hash = await bcrypt.hash(password, 10)

  const user = await User.create({ username, email, password: hash })

  return res.status(201).json({ message: "Пользователь создан", user })
}
