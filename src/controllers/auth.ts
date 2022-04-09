/**
 * Auth Controller
 * 
 * @since 1.0.0
 * @version 1.0.0
 */

import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import Mailer from '../helper/mailer';
import User from '../models/user';

class AuthController {


    /**
     * Login Handler
     * 
     * @param req Request
     * @param res Response
     */
    public async login(req: Request, res: Response) {
        let { email, password } = req.body;

        if ( !(email && password) ) {
            res.status(400).json({ msg: 'Email and password are required' });
        }

        let user: any;

        try {
            user = await User.findOne({ 
                email: email, 
                password: password 
            });
        } catch(error) {
            console.log("login has an error: ", error);
            res.status(401).json({
                msg: 'Login error'
            });
        }

        const token = jwt.sign({
            email: user.email,
            password: user.password,
            role: user.role
        }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '1h'
        });

        res.status(200).json({
            msg: "Login Success",
            token: token
        });
    }



    /**
     * Forget password handler
     * 
     * @param req Request
     * @param res Response
     */
    public async forgetPassword(req: Request, res: Response) {
        let { email } = req.body;

        let user: any;
        try {
            user = User.findOne({ email: email });
        } catch(error) {
            console.log("User does not exist: ", error);
            res.status(404).send({
                msg: 'User not found'
            });
        }

        let emailBody = 'blalblabllabalblablalbla';

        let mailer = new Mailer({
            to: user.email,
            from: 'corona@support.com',
            subject: 'Reset password',
            html: emailBody
        });

        mailer.send();

        res.status(200).json({
            msg: 'We sent you a link to reset password. Please check your inbox'
        })
    }
}

export default AuthController;