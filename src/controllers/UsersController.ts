import type {Request, Response, NextFunction} from 'express'
import passport from 'passport';
import Users from '../models/Users';
import { singToken } from '../middleware/jwt';


export class UsersControllers {

        static usersLogin = async (req:Request, res:Response) => {

      
       /*         passport.authenticate('discord')(req, res, (error) => {
            if (error) {
                console.error('Error en autenticación Discord:', error)
                res.redirect('/');
                return;
            }
        }); */

        const auth = await passport.authenticate('discord') 
               
        if(!auth) return res.redirect('/');
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

                const avatar = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`

                const payload={
                    discordUserId: profile.id,
                    discordUserName: profile.username,
                    discordUserAvatar: avatar,
                    discordUserMail: profile.email
                }               

                if (!user) {
                    user = await Users.create(payload)
                } 

                const token = await singToken(payload)
                if(!token) return res.redirect('/');
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