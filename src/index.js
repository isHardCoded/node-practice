import express from 'express'
import db from './models/index.js'
import routes from './routes/index.js'

const app = express()
app.use('/api', routes)

async function start() {
  try {
    await db.sequelize.authenticate()
    console.log('DB connected')

    await db.sequelize.sync()

    app.listen(3000, () => {
      console.log(`Server listening on port 3000`)
    })
  } catch(err) {
    console.error('Error:', err);
  }
}

start()