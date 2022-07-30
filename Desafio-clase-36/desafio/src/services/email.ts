import Config from '../config';
import nodemailer from 'nodemailer';

class Email {
	private owner: any;
	private transporter: any;

	constructor() {
		this.owner = {
			name: Config.GMAIL_NAME,
			address: Config.GMAIL_EMAIL,
		};

		/* TRANSPORTER PARA ETHREAL EMAIL */
		// 	this.transporter = nodemailer.createTransport({
		// 		host: 'smtp.ethereal.email',
		// 		port: 587,
		// 		auth: {
		// 			user: Config.ETHEREAL_EMAIL,
		// 			pass: Config.ETHEREAL_PASSWORD,
		// 		},
		// 	});
		// }

		/* TRANSPORTER PARA GMAIL */
		this.transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: Config.GMAIL_EMAIL,
				pass: Config.GMAIL_PASSWORD,
			},
		});
	}

	async sendEmail(dest: string, subject: string, content: string) {
		const mailOptions = {
			from: this.owner,
			to: dest,
			subject,
			html: content,
		};

		const response = await this.transporter.sendMail(mailOptions);
		return response;
	}
}

export const EmailService = new Email();
