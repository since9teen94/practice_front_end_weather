import { useEffect, useState } from "react";
import styles from "./Weather.module.css";
const Weather = (props) => {
  const APIKEY = process.env.REACT_APP_API_KEY
  const lat = "40.71";
  const long = "74.01";
  const CALL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly,alerts&units=imperial&appid=${APIKEY}`;
  const [weather, setWeather] = useState([]);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  useEffect(() => {
    const getWeather = async () => {
      const res = await fetch(CALL);
      const data = await res.json();
      return data;
    };
    getWeather().then((ob) => {
      let gotWeather = ob.daily.map((day) => [
        day.dt,
        day.temp.min,
        day.temp.max,
        day.weather[0].icon,
      ]);
      gotWeather.forEach(
        (day) => (day[0] = days[new Date(day[0] * 1000).getDay()])
      );
      while (gotWeather.length > 5) {
        gotWeather.pop();
      }
      setWeather(gotWeather);
    });
  }, []);
  return (
    <div className={styles.forecast}>
      {weather.map((day) => (
        <div key={day[0]} className={styles.day}>
          <h1>{day[0]}</h1>
          <img
            src={`http://openweathermap.org/img/wn/${day[3]}@2x.png`}
            alt="Weather"
          />
          <div>
            <p>Min: {day[1]}</p>
            <p>Max: {day[2]}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Weather;
