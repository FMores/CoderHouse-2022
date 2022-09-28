import { object } from 'joi';
import config from '../config';

export interface IMail_creator {
	full_name: string;
	adress: string;
	age: number;
	phone_number: string;
	email: string;
}

export interface Imail_content {
	destination: String;
	subject: string;
	content: string;
}

export const newUser_template = (user_data: IMail_creator) => {
	const { full_name, adress, age, phone_number, email } = user_data;

	const destination = config.GMAIL_OWNER_ADRESS;
	const subject = 'A new user has logged in';
	const content = `
    <h1>Hello Admin!</h1>
    <br />
    <h3>A new user has logged into your e-commerce.</h3>
    <br />
    <table>
        <th>New user data:</th>
        <tr>
            <td>Full Name:</td>
            <td>${full_name}</td>
        </tr>
        <tr>
            <td>Adress:</td>
            <td>${adress}</td>
        </tr>
        <tr>
            <td>Age:</td>
            <td>${age}</td>
        </tr>
        <tr>    
            <td>Phone Number:</td>
            <td>${phone_number}</td>
        </tr>
        <tr>
            <td>Email:</td>
            <td>${email}</td>
        </tr>
    </table>
    `;

	return {
		destination,
		subject,
		content,
	};
};

export const email_order = (order: any, order_num: number): string => {
	let orderDetail = `
    <h1>Orden de compra N°${order_num}</h1>
    <h3>Detalle de la compra:</h3>
    <table>
    `;

	order.forEach((el: any) => {
		orderDetail += `<tr><td>${el.product.name} x ${el.qty} = $${
			el.qty * el.product.price
		}</td></tr>`;
	});

	orderDetail += '</table>';

	return orderDetail;
};
