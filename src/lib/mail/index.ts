import nodemailer, { Transporter } from 'nodemailer'

export async function createTransport() {
    let testAccount = await nodemailer.createTestAccount()

    // create reusable transporter object using the default SMTP transport
    return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    })
}

export async function sendMail(
    transporter: Transporter,
    to: string,
    subject: string,
    text: string
) {
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html: '<b>Hello world?</b>', // html body
    })

    console.log('Message sent: %s', info.messageId)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
