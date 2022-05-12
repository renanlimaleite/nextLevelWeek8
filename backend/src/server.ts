import express from 'express'
import cors from 'cors'
import { routes } from './routes'

const PORT = 3333
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`)
})