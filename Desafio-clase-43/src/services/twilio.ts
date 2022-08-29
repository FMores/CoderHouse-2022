import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/message';
import config from '../config';
import twilio from 'twilio';

class Twilio {
	private twilio;

	constructor() {
		this.twilio = twilio(config.TWILIO_SID, config.TWILIO_TOKEN);
	}

	/* PARA UTILIZAR CON MENSAJES CLASICOS (SMS) */
	async sendSms(smsPhoneNumber: string, message: string) {
		const params = {
			body: message,
			from: config.TWILIO_SMS_NUMBER,
			to: smsPhoneNumber,
		};

		const smsResponse = await this.twilio.messages.create(params);
		return smsResponse;
	}

	/* PARA UTILIZAR CON WHATSAPP */
	async sendWsp(wspPhoneNumber: string, message: string, picture?: string) {
		/* ESTE TYPADO ES PARA QUE PUEDAS ENVIAR IMAGENES */
		const params: MessageListInstanceCreateOptions = {
			body: message,
			from: `whatsapp:${config.TWILIO_WSP_NUMBER}`,
			to: `whatsapp:${wspPhoneNumber}`,
		};

		/* SI ENVIAMOS IMAGENES, DEBEN SER JPG */
		if (picture) params.mediaUrl = [picture];

		const wspResponse = await this.twilio.messages.create(params);
		return wspResponse;
	}
}

/* PASOS PARA RECIBIR RESPUESTA DEL DESTINATARIO */
/*
1. Ir a https://ngrok.com/ y loguearse.
2. Descargar el Unzip que corresponda para tu SO y lo guardan en su proyecto o donde ustedes prefieran.
3. Desde el terminal, ingresar a la carpeta contenedora del unzip y ejecutar con el siguiente comando: sudo ngrock ./http 8080
   el puerto es el mismo donde corre el server. Ya que esta pag. hace de puente de conexion entre la app y twilio.
4. Se ejecuta ngrok y te devuelve dos rutas conectadas a tu localhost, una es http y la otra https.
5. Tomamos esa ruta y la pegamos en la pagina de twilio en: "WHEN A MESSAGE COMES IN" y damos save.
6. Con estos pasos estamos listos para probar el ida y vuelta de los mensajes por WSP.
*/
export const mobile_messaging_service = new Twilio();
