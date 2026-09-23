import express, { type Request, type Response } from "express"

const app = express()

app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
        status:"success",
        message:"server healthy"
    })
})


app.listen(3000, () => {
    console.log("server jalan");
})