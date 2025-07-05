// WeatherMap.js
import React, { useEffect, useRef, useState } from 'react';
import '../../App.css';
import Navbar from '../Navbar';

const WeatherMap = () => {
  const mapRef = useRef(null);
  const [weatherInfo, setWeatherInfo] = useState(null);

  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_MAP_CLIENT_ID;
  const OPENWEATHER_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

  useEffect(() => {
  if (!NAVER_CLIENT_ID) {
    console.error('NAVER_CLIENT_ID가 정의되지 않았습니다.');
    return;
  }

  const script = document.createElement('script');
  script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_CLIENT_ID}`;
  script.async = true;
  script.onload = () => {
    console.log('네이버 지도 스크립트 로드됨');
    initMap();
  };
  script.onerror = () => {
    console.error('네이버 지도 스크립트 로딩 실패');
  };
  document.head.appendChild(script);

  return () => {
    document.head.removeChild(script);
  };
}, [NAVER_CLIENT_ID]);

  const initMap = () => {
    const naver = window.naver;
    if (!naver || !mapRef.current) return;

    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(37.5665, 126.9780), // 서울 중심
      zoom: 7,
    });

    const marker = new naver.maps.Marker({
      map: map,
      position: new naver.maps.LatLng(37.5665, 126.9780),
    });

    naver.maps.Event.addListener(map, 'click', async function (e) {
      const lat = e.coord.lat();
      const lng = e.coord.lng();

      marker.setPosition(new naver.maps.LatLng(lat, lng));

      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_KEY}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();

        setWeatherInfo({
          city: data.name || '알 수 없음',
          temp: data.main?.temp ?? 'N/A',
          desc: data.weather?.[0]?.description ?? '정보 없음',
        });
      } catch (error) {
        console.error('날씨 정보를 불러오는 데 실패했습니다:', error);
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="weather-container">
        <div
          id="weather-map"
          ref={mapRef}
          style={{ width: '60vw', height: '70vh', border: '1px solid #ccc' }}
        />
        <div className="weather-info-box-border">
          <div className="weather-info-box">
            {weatherInfo ? (
              <>
                <div className="weather-info0">현재 <span>선택</span>된 지역의 날씨를 보여줍니다.</div>
                <h3 className="weather-info1">{weatherInfo.city}</h3>
                <p className="weather-info2">{weatherInfo.desc}</p>
                <p className="weather-info3">{weatherInfo.temp}°C</p>
              </>
            ) : (
              <p className="guide">지도를 클릭하면 해당 지역의 날씨를 확인할 수 있습니다.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherMap;