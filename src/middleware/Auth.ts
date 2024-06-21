import { Request, Response, NextFunction } from 'express';

export class Auth {

    static authenticated = async (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard');
        }
        res.redirect('/');      
    }
}