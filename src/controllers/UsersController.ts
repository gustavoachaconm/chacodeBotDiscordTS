import type {Request, Response, NextFunction} from 'express'
import passport from 'passport';
import Users from '../models/Users';
import { singToken } from '../middleware/jwt';
import bitfieldCalculator from 'discord-bitfield-calculator';

let userData: any = [];
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
                let findUser = await Users.findOne({ discordUserId: profile.id})

                const avatar = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`

                const user={
                    discordUserId: profile.id,
                    discordUserName: profile.username,
                    discordUserAvatarUrl: avatar,
                    discordUserMail: profile.email
                }

                userData.push({                      
                    user
                 })

                for (let i = 0; i < profile.guilds.length; i++) {
                   const guilds = profile.guilds[i];

                   if(guilds.owner === true) {
                    const permission = bitfieldCalculator.permissions(guilds.permissions)

                    if(permission.includes('ADMINISTRATOR')) {
 
                     userData.push({                      
                        guilds
                     })
                    
                 }
                }
                }
                

                if (!findUser) {
                  await Users.create(user)
                }                
                const token = await singToken(user)
                if(!token) return res.redirect('/');

                console.log(userData)
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