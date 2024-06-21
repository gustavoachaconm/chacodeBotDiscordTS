import mongoose from 'mongoose'
import colors from 'colors'
import {exit} from 'node:process'

export const connectDB = async () => {
    try {  
        const {connection} = await mongoose.connect(process.env.DB_URL)
        const url = `${connection.host}:${connection.port}`
        console.log(colors.bgGreen.bold(` MongoDB conectado en: ${url} `))
    } catch (error) {
        console.log(error.message)
        console.log(colors.bgRed.bold(' Error al conectar con MongoDB '))
        exit(1)
    }
    
}