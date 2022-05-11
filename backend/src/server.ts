import express from 'express'
import { prisma } from './prisma'
import nodemailer from 'nodemailer'

const PORT = 3333
const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "310b145b1a42b3",
    pass: "95264c62d56337"
  }
});

app.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body
  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Renan Leite <renan@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="color: #111">`,
      `<p>Tipo do feedback ${type}</p>`,
      `<p>Comentário ${comment}</p>`,
      `</div>`
    ].join('\n')
  })

  return response.status(201).json({ data: feedback })
})

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`)
})