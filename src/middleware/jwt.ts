import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { Request,Response,NextFunction } from 'express';

dotenv.config();



    export const singToken = async (user: any) => {
        try {
            const token = await jwt.sign(user, process.env.SECRET_JWT, { expiresIn: "24h" });
            return token 
        } catch (error) {
            console.log('Error al generar el token:', error)
        }
        
    }

    export const verifyToken = (req:Request, res:Response,next:NextFunction) => {
        
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if(token == undefined || token == null || token == "") return res.sendStatus(401).send("el token no puede ir vacio");
      
        try {
            const verifyToken = jwt.verify(token, process.env.SECRET_JWT)        
            next()
    
        } catch (error) {
            res.status(401).send('Token invalid or has expired')    
        } 
    }

