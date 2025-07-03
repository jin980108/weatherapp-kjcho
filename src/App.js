import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import { ClipLoader } from "react-spinners";
import ForecastList from './component/Forecast';
import CurrentTime from './component/CurrentTime';

//1. 현재위치 기반의 날씨 정보 
//2. 날씨상태 
//3. 5개의 버튼 존재 
//4. 도시별 날씨
//5. 데이터를 들고오는 동안 로딩 스피너 활용

function App() {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const cities=['Seoul','Daejeon','Daegu','Busan','Gwangju','Guri','Incheon','Junju','Sokcho','Tokyo'];
  const [forecast, setForecast] = useState([]);
  // const translateCity = {
  //   Seoul: "서울",
  //   Incheon: "인천",
  //   Busan: "부산",
  //   Daejeon: "대전",
  //   Daegu: "대구",
  //   Gwangju: "광주",
  //   Junju: "전주",
  //   Guri: "구리" 
  // };
  // const [forecast, setForecast] = useState([]);
  const getCurrentLocation = () =>{
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let lang = "kr";

      getWeatherByCurrentLoaction(lat,lon,lang);
      getForecastByCurrentLocation(lat,lon);
    });
  };

  const getWeatherByCurrentLoaction = async(lat,lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4d5dbe065d3aa1070e9e85970eb06298&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }

  const getWeatherByCity = async() =>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4d5dbe065d3aa1070e9e85970eb06298&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }

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
    if(!city || city == "current"){
      getCurrentLocation();
    } else {
      getWeatherByCity();
      getForecastByCity();
    }
  },[city]);

  return (
    <div>
      <div className="subject">여기, 날씨 <span>version of korea</span></div>
      {loading? (
         <div className = "loading-container"> <ClipLoader color="black" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader"/></div>
      )
       : (<div className = "container"> <CurrentTime /><WeatherBox  weather={weather}/><ForecastList forecast={forecast} weather={weather}/><WeatherButton className="weather-button" cities={cities}  handleCityChange={handleCityChange} selectedCity={city}/></div>
    )} 
    </div>
  );
}

export default App;
