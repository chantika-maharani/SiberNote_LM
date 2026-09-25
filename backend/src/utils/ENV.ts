import dotenv from "dotenv"

dotenv.config()

const envVariable: {
    PORT: number
    MONGO_URL: string
    JWT_KEY: string
    REFRESH_TOKEN_KEY: string
} = {
    PORT: Number(process.env.PORT) || 8080,
    MONGO_URL: process.env.MONGO_URL || "",
    JWT_KEY: process.env.JWT_KEY || "ligma",
    REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY || "ligma_refresh",
}

export default envVariable
