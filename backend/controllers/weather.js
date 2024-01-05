import axios from "axios"

export const getWeather=async(req,res)=>{
        const { cities } = req.body;
        console.log(cities)
        const weatherData = {};
        const apiKey=process.env.WEATHER_API_KEY
        try {
          const promises = cities.map(async (city) => {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
            const temperature = response.data.main.temp;
            weatherData[city] = `${temperature}C`;
          });
      
          await Promise.all(promises);
          return res.status(200).json({ weather: weatherData });
    }catch(err){
        return res.status(400).json(err.message)
    }
}