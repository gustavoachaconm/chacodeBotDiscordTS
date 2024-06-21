import mongoose, {Schema, Document} from 'mongoose'

export type UsersType = Document & {
    discordUserId: number
    discordUserName:string
    discordUserAvatarUrl: string
    discordUserMail: string
}

const UsersSchema: Schema = new Schema ({
    discordUserId:{
        type: Number,
        require: true,
        trim: true
    },
    discordUserName:{
        type: String,
        require: true,
        trim: true
    },
    discordUserAvatarUrl:{
        type: String,
        require: true,
        trim: true
    },
    discordUserMail:{
        type: String,
        require: true,
        trim: true
    },
})

const Users = mongoose.model<UsersType>('Users', UsersSchema)
export default Users