import axios from "axios";

export const getWeather = async (req, res) => {
  const { cities } = req.body;
  const weatherData = {};
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const promises = cities.map(async (city) => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const temperature = response.data.main.temp;
        weatherData[city] = `${temperature}C`;
      } catch (error) {
        weatherData[city] = 'Not available';
      }
    });

    await Promise.all(promises);
    return res.status(200).json({ weather: weatherData });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
