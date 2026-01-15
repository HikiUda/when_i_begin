const nodemailer = require('nodemailer');

class MailService {
   constructor() {
      this.transporter = nodemailer.createTransport({
         host: process.env.SMTP_HOST,
         port: process.env.SMTP_PORT,
         secure: false,
         service: 'gmail',
         auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_APP_PSWD,
         },
      });
   }
   async sendActivationMail(to, link) {
      await this.transporter.sendMail({
         from: process.env.API_URL,
         to,
         subject: 'Activation account on' + process.env.API_URL,
         text: '',
         html: `
				<div>
					<h1>For activation follow the link</h1>
					<a href="${link}">${link}</a>
				</div>
			`,
      });
   }
}

module.exports = new MailService();
