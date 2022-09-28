import { newUser_template } from '../../utils/mail.template';
import mongoOrdersModel from '../carts/mongo.orders.model';
import { Strategy as LocalStrategy } from 'passport-local';
import mongoCartsModel from '../carts/mongo.carts.model';
import mongoUserModel from '../users/mongo.user.model';
import { INewCart } from '../carts/carts.interfaces';
import { EmailService } from '../../services/email';
import { Request } from 'express';
import passport from 'passport';

declare global {
	namespace Express {
		interface User {
			_id: string;
			email: string;
			password: string;
		}
	}
}

const strategyOptions: any = {
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true,
};

const loginFunc = async (req: Request, email: string, password: string, done: any) => {
	// Busco en la DB si existe el email
	const user = await mongoUserModel.findOne({ email });

	// Si no existe, termino la funcion.
	if (!user) {
		return done(null, false, 'Invalid email!');
	}

	// Si existe el email, comparo las contraseñas.
	if (!(await user.comparePwd(password))) {
		return done(null, false, 'Invalid password!');
	}

	return done(null, user);
};

const signUpFunc = async (req: Request, email: string, password: string, done: any) => {
	const { full_name, adress, age, phone_number } = req.body;
	const picture_data = req.file;

	//Busco en la DB si ya existe un usuario con ese email
	const userExist = await mongoUserModel.findOne({ email: email });

	// Si existe, termino con error.
	if (userExist) {
		return done(null, false, 'User already exists');
	}

	// Si no existe, creo un nuevo usuario.
	const newUserData = {
		full_name,
		adress,
		age,
		phone_number,
		profile_picture: picture_data?.originalname,
		email,
		password,
	};

	const newUserCreated = new mongoUserModel(newUserData);

	await newUserCreated.save();

	// //Creo un nuevo carrito para el nuevo usuario
	const newCart: INewCart = {
		user: newUserCreated._id,
	};

	const newCartForTheUser = new mongoCartsModel(newCart);

	await newCartForTheUser.save();

	// //Creo un documento para las ordenes del cliente
	const newOrderToCreate = {
		user: newUserCreated._id,
		orders_qty: 0,
		orders: [],
	};

	const newOrder = new mongoOrdersModel(newOrderToCreate);

	await newOrder.save();

	// Envío un email notificando que se creo un nuevo usuario.
	const { destination, subject, content } = await newUser_template(req.body);
	await EmailService.sendEmail(destination, subject, content);

	return done(null, newUserCreated);
};

passport.use('login', new LocalStrategy(strategyOptions, loginFunc));

passport.use('signup', new LocalStrategy(strategyOptions, signUpFunc));

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((userId, done) => {
	mongoUserModel.findById(userId, function (err: any, user: any) {
		done(err, user);
	});
});
