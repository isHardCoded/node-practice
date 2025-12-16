import db from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

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

export async function login(req, res) {
  const { username, password } = req.body

  if (!username || !password) { 
    return res.status(400).json({ message: "Заполните все поля" })
  }

  const user = await User.findOne({
		where: { username },
	})

	if (!user) {
		return res
			.status(400)
			.json({ message: 'Неверное имя пользователя или пароль' })
	}

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    return res.status(400).json({ message: 'Неверное имя пользователя или пароль'})
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '7d' })

  return res.json({ token })
}
