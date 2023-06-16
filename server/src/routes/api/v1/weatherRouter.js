import { Express } from "express";

const weatherRouter = new Express.Router()

weatherRouter.get("/", async (req, res) => {
    const cityName = req.query.cityName

    try{
        const weatherResponse = await OpenWeatherClient.getForcast(cityName)
        const weatherData = JSON.parse(weatherResponse)
        return res
            .set({ "Content-Type": "application/json" })
            .status(200)
            .json(weatherData)
    }catch(error){
        return res.status(401).json({ errors: error})
    }
})

export default weatherRouter