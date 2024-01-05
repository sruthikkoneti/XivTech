import express from "express"
import { getWeather } from "../controllers/weather.js"

const router = express.Router()

router.post("/getWeather",getWeather)

export default router