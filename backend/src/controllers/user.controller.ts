import type { Request, Response } from "express";
import bcrypt from "bcrypt"
import User from "../models/user.model.js";

export const createUser = async(req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body
        const hashedPassword = await hashPassword(password)

        const user = await User.create({ email, username, password: hashedPassword })
        
        return res.status(201).json({
            status:"success",
            message: "berhasil buat user",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            status:"failed",
            message: "gagal buat user",
            error
        })
    }
}





const  hashPassword= async(plainPassword:string)=> {
    const saltRounds = 10; 
    
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
}

const verifyPassword=async(plainPassword:string, hashedPassword:string)=> {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
}