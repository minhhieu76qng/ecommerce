const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// module.exports = { transporter };

class Mailer {
  constructor(user, pass) {
    this.account = {
      user,
      pass
    }

    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: this.account.user,
        pass: this.account.pass
      }
    });
  }

  async sendMail(toEmail, mailContent) {

    const mailOption = {
      from: this.account.user,
      to: toEmail,
      subject: mailContent.subject || '',
      text: mailContent.text || '',
      html: mailContent.html || ''
    }
    const info = await this.transporter.sendMail(mailOption);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}

const mailer = new Mailer('minhhieu0201199838@gmail.com', 'zz01666110572');

module.exports = {
  async sendVerifyEmail(user) {
    const { MAIL_USER, MAIL_PASSWORD, JWTSECRET } = process.env;
    // const MAIL_USER = 'minhhieu0201199838@gmail.com', MAIL_PASSWORD = 'zz01666110572';

    if (!(MAIL_USER && MAIL_PASSWORD)) {
      return {
        isSent: false,
        errors: [{
          message: "Mail or password does not exist!"
        }]
      }
    }

    const token = jwt.sign({ _id: user._id }, JWTSECRET);

    const link = `http://localhost:5000/api/users/verification/${token}`;

    const content = {
      subject: 'Aware - Verify account.',
      html: `<p>Welcome to our shop! Please click the below link to verify account!</p><a href="${link}">${link}</a>`
    }

    const mailer = new Mailer(MAIL_USER, MAIL_PASSWORD);

    const result = await mailer.sendMail(user.email, content).catch(err => {
      console.log(err);
      return {
        isSent: false,
        code: err.code
      }
    })

    return {
      isSent: true
    }
  }
}