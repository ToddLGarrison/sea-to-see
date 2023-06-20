import got from "got";
import dotenv from "dotenv";
dotenv.config();

const openWeatherApiKey = process.env.OpenWeather

class OpenWeatherClient {
    static async getForecast(cityName) {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherApiKey}`;
            const apiResponse = await got(url)
            const responseBody = apiResponse.body
            return responseBody
        } catch(error){
            return {error: error.message}
        }
    }
}

export default OpenWeatherClient;