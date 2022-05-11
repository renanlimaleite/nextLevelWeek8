import nodemailer from 'nodemailer'
import { IMailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "310b145b1a42b3",
    pass: "95264c62d56337"
  }
});

export class NodemailerMailAdapter implements IMailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Renan Leite <renan@gmail.com>',
      subject,
      html: body
    })
  };
}