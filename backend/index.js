//Import npm packages
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
//Import routes
import weatherRoutes from './routes/weather.js'

dotenv.config()
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


//ROUTES
app.use("/",weatherRoutes)


app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
})

export default app;