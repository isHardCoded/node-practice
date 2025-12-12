import jwt from 'jsonwebtoken'

export default function auth(req, res, next) {
	const header = req.headers.authorization

	if (!header) {
		return res.status(401).json({ message: 'Нет токена' })
	}

	const token = header.split(' ')[1]

	try {
		const decoded = jwt.verify(
			token,
			'B0jICjsJ2qUaSHfOTsDT3Cs5FAxMTBp84BWxYizopn6'
		)
		req.userId = decoded.id
		next()
	} catch (e) {
		return res.status(401).json({ messsage: 'Неверный токен' })
	}
}