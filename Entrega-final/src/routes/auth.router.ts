import { Router, Request, Response, NextFunction } from 'express';
import { joiValidator } from '../middleware/joi.validator';
import { mail_creator } from '../utils/mail.creator';
import { logger } from '../utils/winston.logger';
import { EmailService } from '../services/email';
import { login } from '../models/auth/joi.auth.schema';
import passport from 'passport';

// declare module 'express-session' {
//     export interface SessionData {
//         auth: boolean;
//         uname: string;
//     }
// }

export const authRouter = Router();

/*----------------------------------------------- */
/*-------------------- LOGIN -------------------- */
/*----------------------------------------------- */
authRouter.get('/login', (req: Request, res: Response) => {
    res.render('logIn');
});

authRouter.get('/invalid-credentials', (req: Request, res: Response) => {
    res.render('invalidCredentials');
});

authRouter.post(
    '/login',
    joiValidator(login),
    passport.authenticate('login', {
        successRedirect: '/api/home',
        failureRedirect: '/api/auth/invalid-credentials',
        failWithError: true,
    })
);

/*------------------------------------------------ */
/*-------------------- SIGNUP -------------------- */
/*------------------------------------------------ */
authRouter.get('/signup', (req: Request, res: Response) => {
    res.render('signup');
});

authRouter.post(
    '/signup',
    // upload_single_img,
    // multer_check_img,
    (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('signup', async function (err, user, info) {
            if (err) {
                logger.error(`Signup error: ${err}`);
                return next(err);
            }

            if (!user) {
                logger.error(`Signup invalid user: ${info}`);
                return res.render('userExist');
            }

            const mail = await mail_creator(req.body);

            await EmailService.sendEmail(mail.destination, mail.subject, mail.content);

            res.redirect('/api/home');
        })(req, res, next);
    }
);

/*------------------------------------------------ */
/*-------------------- LOGOUT -------------------- */
/*------------------------------------------------ */
// authRouter.get('/logout', (req: Request, res: Response) => {
//     let uEmail: string;

//     if (req.user) {
//         uEmail = req.user.email;
//     }

//     req.session.destroy(e => {
//         if (e) {
//             throw new Error(e.message);
//         }
//         return res.render('logout', { uEmail });
//     });
// });
