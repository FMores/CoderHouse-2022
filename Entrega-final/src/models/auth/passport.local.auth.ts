import { Strategy } from 'passport-local';
import mongoUserModel from '../auth/mongo.user.model';
import { Request, Response } from 'express';
import passport from 'passport';
import { IUser } from './user.interfaces';

const strategyOptions: any = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
};

const loginFunc = async (req: Request, email: string, password: string, done: any) => {
    const user: any = await mongoUserModel.findOne({ email });

    if (!user) {
        return done(null, false, 'Invalid email!');
    }

    if (!(await user.comparePassword(password))) {
        return done(null, false, 'Invalid password!');
    }

    return done(null, user);
};

const signUpFunc = async (req: Request, email: string, password: string, done: any) => {
    const { fullName, cellPhone } = req.body;
    //const picture_data = req.file;

    const user = await mongoUserModel.findOne({ email: email });

    if (user) {
        return done(null, false, 'User already exists');
    } else {
        const userData: IUser = {
            fullName,
            cellPhone,
            //profile_picture: picture_data?.originalname,
            email,
            password,
        };

        const newUser = new mongoUserModel(userData);

        await newUser.save();

        return done(null, newUser);
    }
};

passport.use('login', new Strategy(strategyOptions, loginFunc));

passport.use('signup', new Strategy(strategyOptions, signUpFunc));

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
