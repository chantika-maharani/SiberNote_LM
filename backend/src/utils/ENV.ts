import dotenv from "dotenv"

dotenv.config()

const envVariable = {
    PORT: Number(process.env.PORT) || 8080,
    MONGO_URL: process.env.MONGO_URL || ""
}

export default envVariable