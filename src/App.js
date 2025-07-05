import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import { ClipLoader } from 'react-spinners';
import ForecastList from './component/Forecast';
import CurrentTime from './component/CurrentTime';
import Navbar from './component/Navbar';
import WeatherMap from './component/Page/WeatherMap';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { NavermapsProvider } from 'react-naver-maps';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState([]);
  const cities = ['Seoul','Daejeon','Daegu','Busan','Gwangju','Guri','Incheon','Junju','Sokcho','Tokyo'];
  const location = useLocation();
  const navigate = useNavigate();
  
  const goToHome = () => {
    navigate('/');
  }

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLoaction(lat, lon);
      getForecastByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLoaction = async(lat,lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4d5dbe065d3aa1070e9e85970eb06298&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const getWeatherByCity = async() => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4d5dbe065d3aa1070e9e85970eb06298&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const getForecastByCity = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=4d5dbe065d3aa1070e9e85970eb06298&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    setForecast(data.list);  
  };

  const getForecastByCurrentLocation = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=4d5dbe065d3aa1070e9e85970eb06298&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    setForecast(data.list);
  };

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    if(location.pathname === "/") { 
      if (!city || city === "current") {
        getCurrentLocation();
      } else {
        getWeatherByCity();
        getForecastByCity();
      }
    }
  }, [city, location.pathname]);

  return (
    <NavermapsProvider ncpClientId="YOUR_CLIENT_ID_HERE">
      <div>
        <div className="subject" onClick={goToHome}>여기, 날씨 <span>2025</span></div>

        {location.pathname === "/" && !loading && <Navbar />}

        <Routes>
          <Route path="/" element={
            loading ? (
              <div className="loading-container">
                <ClipLoader color="black" loading={loading} size={150} />
              </div>
            ) : (
              <div className="container">
                <CurrentTime />
                <WeatherBox weather={weather} />
                <ForecastList forecast={forecast} weather={weather} />
                <WeatherButton cities={cities} handleCityChange={handleCityChange} selectedCity={city} />
              </div>
            )
          } />
          <Route path="/map" element={<WeatherMap />} />
        </Routes>
      </div>
    </NavermapsProvider>
  );
}

export default App;
