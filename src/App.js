import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';

//1. 현재위치 기반의 날씨 정보 
//2. 날씨상태 
//3. 5개의 버튼 존재 
//4. 도시별 날씨
//5. 데이터를 들고오는 동안 로딩 스피너 활용

function App() {

  const getCurrentLocation = () =>{
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLoaction(lat,lon)
      console.log("현재위치 : " + lat,lon);
    });
  };

  const getWeatherByCurrentLoaction = async(lat,lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4d5dbe065d3aa1070e9e85970eb06298`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("data",data);
  }

  useEffect(() =>{
    getCurrentLocation()
  },[])

  return (
    <div className = "container">
      <WeatherBox />
      <WeatherButton />
    </div>
  );
}

export default App;
