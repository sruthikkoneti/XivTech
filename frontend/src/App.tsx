import axios from "axios";
import { useState } from "react";
import './App.css'
interface WeatherResponse {
    weather: {
        [city: string]: string;
    };
}

interface CityCardProps {
    cityName: string;
    temperature: string;
}

const CityCard: React.FC<CityCardProps> = ({ cityName, temperature }) => {
    const capitalizeCityName = cityName
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const convertedTemperature = temperature.replace("C", "°C");

    return (
        <div className="border border-gray-300 rounded-md p-5 mb-5 bg-white opacity-75">
            <h3 className="text-lg font-semibold">{capitalizeCityName}</h3>
            <p>Temperature: {convertedTemperature}</p>
        </div>
    );
};

function App() {
    const [weatherData, setWeatherData] = useState<WeatherResponse>({ weather: {} });
    const [cities, setCities] = useState<string[]>([]);
    const [newCity, setNewCity] = useState<string>('');

    const addCity = () => {
        setCities([...cities, newCity]);
        setNewCity('');
    };

    const handleSubmit = async () => {
        try {
            const body = { cities };
            // const URL=import.meta.env.VITE_HOST_URL
            // const response = await axios.post<WeatherResponse>(`${URL}getWeather`, body);
            const response = await axios.post<WeatherResponse>('https://xivtech-backend-iwet.onrender.com/getWeather', body);
            setWeatherData(response.data);
            setCities([])
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-8 rounded-lg">
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="Enter city name"
                    className="mr-2 p-2 border border-gray-300 rounded-md"
                />
                <button onClick={addCity} className="p-2 bg-purple-500 text-white rounded-md">
                    Add City
                </button>
            </div>
            <div>
                {cities.length > 0 && ( // Only render if cities array is not empty
                    <div>
                        <span>Searching for...</span>
                        <ul>
                            {cities.map((city, index) => (
                                <li key={index}>{`${index + 1}. ${city}`}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <button onClick={handleSubmit} className="mt-4 p-2 bg-purple-500 text-white rounded-md">
                Get Weather
            </button>
            <div className="mt-8">
                <h2 className="text-xl font-semibold">Weather Data</h2>
                {Object.keys(weatherData.weather).length > 0 && (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {Object.keys(weatherData.weather).map((city, index) => (
                            <CityCard key={index} cityName={city} temperature={weatherData.weather[city]} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
