import { Strategy as LocalStrategy } from 'passport-local';
import mongoUserModel from '../models/mongo.user.model';
import { Request, Response } from 'express';
import passport from 'passport';

declare global {
	namespace Express {
		interface User {
			_id?: string;
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
	const user = await mongoUserModel.findOne({ email });

	if (!user) {
		return done(null, false, 'Invalid email!');
	}

	if (!(await user.comparePwd(password))) {
		return done(null, false, 'Invalid password!');
	}

	return done(null, user);
};

const signUpFunc = async (req: Request, email: string, password: string, done: any) => {
	const user = await mongoUserModel.findOne({ email: email });

	if (user) {
		return done(null, false, 'User already exists');
	} else {
		const userData = {
			email,
			password,
		};

		const newUser = new mongoUserModel(userData);

		await newUser.save();

		return done(null, newUser);
	}
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

export const isLoggedIn = (req: Request, res: Response, done: any) => {
	if (!req.user) return res.redirect('/api/auth/login');
	done();
};

export default passport;
