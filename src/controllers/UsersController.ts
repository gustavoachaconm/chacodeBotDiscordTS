import type {Request, Response, NextFunction} from 'express'
import passport from 'passport';
import Users from '../models/Users';


export class UsersControllers {
    
    static usersLogin = async (req:Request, res:Response) => {
        passport.authenticate('discord')(req, res, (error) => {
            if (error) {
                console.error('Error en autenticación Discord:', error)
                res.redirect('/');
                return;
            }
        });
    }

    static callback = async (req:Request, res:Response, next: NextFunction) => {
        passport.authenticate('discord', async (error, data) => {
            if (error){
                console.error('Error en autenticación Discord:', error)
                return res.redirect('/')
            }

            const {accesToken, profile} = data
            try {
                let user = await Users.findOne({ discordUserId: profile.id})

                if (!user) {
                    user = await Users.create({
                        discordUserId: profile.id,
                        discordUserName: profile.username,
                        discordUserAvatar: profile.avatar,
                        discordUserMail: profile.email
                    })
                }
                res.redirect('/dashboard')
            } catch (error) {
                console.error('Error al manejar la autenticación de Discord:', error)
                res.redirect('/')
            }
        })(req, res, next);
    }

    static usersLogout = async (req:Request, res:Response, next: NextFunction) => {
        req.logout((err: any) => {
            if (err) {
            } else {
                res.redirect('/'); 
            }
        })
        
    }
}