import express from 'express'
import cors from 'cors'
import { routes } from './routes'
import bodyParser from 'body-parser'

const PORT = 3333
const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`)
})