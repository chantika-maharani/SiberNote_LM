import express, { type Request, type Response } from "express"
import envVariable from "./utils/ENV.js"
import connectDB from "./services/mongo.js"
import userRouter from "./routes/user.route.js"

const app = express()
const PORT = envVariable.PORT

app.use(express.json())
await connectDB()

app.use("/user",userRouter)
app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
        status:"success",
        message:"server healthy"
    })
})


app.listen(PORT, () => {
    console.log("server jalan di port", PORT);
})