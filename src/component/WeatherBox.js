import React from 'react';
import Lottie from 'lottie-react';
import sunny from '../image/sunny.json';
import cloudy from '../image/cloudy.json';
import rainy from '../image/rainy.json';
import foggy from '../image/foggy.json';

const WeatherBox = ({ weather }) => {
  console.log(weather);

  if (!weather?.name) return null;

  const cityMap = {
    seoul: "서울",
    incheon: "인천",
    busan: "부산",
    daejeon: "대전",
    daegu: "대구",
    gwangju: "광주",
    junju: "전주",
    guri: "구리",
    sokcho: "속초",
    tokyo: "도쿄" 
  };

  const translateCity = cityMap[weather.name?.toLowerCase()] || weather.name;

  const weatherMain = weather.weather?.[0]?.main?.toLowerCase();

  let animationData = sunny;
  if (weatherMain === 'clouds') animationData = cloudy;
  else if (weatherMain === 'rain') animationData = rainy;
  else if (weatherMain === 'fog') animationData = foggy;

  return (
    <div className="weather-box">
      <div className="weather-name">
        실시간 {translateCity}의 날씨 정보 <Lottie className="lottie-icon"animationData={animationData}/>
      </div>

      {weather?.main?.temp !== undefined && (
        <div className="weather-temp">
          <h2>
            {Math.round(weather.main.temp)}°C / {(weather.main.temp * 1.8 + 32).toFixed(1)}°F
          </h2>
        </div>
      )}

      <div className="weather-description">
        <h3>{weather?.weather?.[0]?.description}</h3>
      </div>
    </div>
  );
};

export default WeatherBox;