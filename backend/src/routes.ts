import express from 'express'
import nodemailer from 'nodemailer'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router()

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "310b145b1a42b3",
    pass: "95264c62d56337"
  }
});


routes.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository
  )

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })

  // await transport.sendMail({
  //   from: 'Equipe Feedget <oi@feedget.com>',
  //   to: 'Renan Leite <renan@gmail.com>',
  //   subject: 'Novo feedback',
  //   html: [
  //     `<div style="color: #111">`,
  //     `<p>Tipo do feedback ${type}</p>`,
  //     `<p>Comentário ${comment}</p>`,
  //     `</div>`
  //   ].join('\n')
  // })

  return response.sendStatus(201)
})