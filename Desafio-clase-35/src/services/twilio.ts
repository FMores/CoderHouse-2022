import config from '../config';
import twilio from 'twilio';

class Twilio {
	private twilio;

	constructor() {
		this.twilio = twilio(config.TWILIO_SID, config.TWILIO_TOKEN);
	}

	async sendMessage(cellphoneNumber: string, message: string) {
		const params = {
			body: message,
			from: config.TWILIO_PHONE_NUMBER,
			to: cellphoneNumber,
		};

		const response = await this.twilio.messages.create(params);
		return response;
	}
}

export const SmsService = new Twilio();
