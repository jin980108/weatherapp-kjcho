import React, { useEffect, useState } from 'react';

const CurrentTime = () => {
  const [time, setTime] = useState(new Date());

  // 1초마다 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 언마운트 시 clear
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <div className="current-time">
      ⏰ 현재 시간: {formattedTime}
    </div>
  );
};

export default CurrentTime;