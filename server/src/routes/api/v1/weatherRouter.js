import { Express } from "express";
import OpenWeatherClient from "../../../services/OpenWeatherClient";

const weatherRouter = new express.Router()

weatherRouter.get("/", async (req, res) => {
    const { lat, lon } = req.query
    console.log("coordinate", lat, lon)
    try {
        const weatherResponse = await OpenWeatherClient.getForecast(lat, lon)
        const weatherData = JSON.parse(weatherResponse)
        return res
            .set({ "Content-Type": "application/json" })
            .status(200)
            .json(weatherData)
    } catch(error) {
        return res.status(401).json({ errors: error })
    }
})

export default weatherRouter