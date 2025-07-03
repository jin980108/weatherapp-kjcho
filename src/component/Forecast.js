  import React from 'react';
  import {
    ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
  } from 'recharts';

  const ForecastList = ({ forecast, weather }) => {
    if (!weather || !forecast) return null;
    
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

    const emojiMap = {
      'clear sky': '☀️',
      'few clouds': '🌤️',
      'scattered clouds': '☁️',
      'broken clouds': '☁️',
      'overcast clouds': '☁️',
      'shower rain': '🌦️',
      'light rain': '🌧️',
      'thunderstorm': '⛈️',
      'snow': '❄️',
      'mist': '🌫️',
    };

    let translateCity = cityMap[weather.name?.toLowerCase()] || weather.name;

    return (
      <>
        <div className="forecast-title">📆 {translateCity} 일기예보</div>
        <div className="forecast-list">
          {forecast.slice(0, 14).map((item, index) => {
            const emoji = emojiMap[item.weather?.[0]?.description] || '🌡️';
            return (
              <div key={index} className="forecast-item">
                <div className="forecast-emoji" style={{ fontSize: "24px" }}>{emoji}</div>
                <div>{new Date(item.dt * 1000).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12: true })}</div>
                <div>{Math.round(item.main.temp)}°C</div>
                <div>{item.weather[0].description}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  export default ForecastList;