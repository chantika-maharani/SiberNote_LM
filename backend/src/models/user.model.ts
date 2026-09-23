import mongoose from "mongoose"

interface IUser {
    email: string,
    username: string,
    password: string,
    avatarUrl: string,
}

const userSchema = new mongoose.Schema<IUser>({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatarUrl: { type: String },
},{timestamps:true})

const User = mongoose.model("User",userSchema)

export default User