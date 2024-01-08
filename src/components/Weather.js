import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import moment from "moment";
import "./styles.css";
export default function Weather({ weatherData }) {

    const [isCelsius, setIsCelsius] = useState(true);
    const [icon, setIcon] = useState("toggle on");
    function handleClick() {
        setIsCelsius(!isCelsius);

        (icon === "toggle on") ?
            setIcon("toggle off")
            : setIcon("toggle on")
        // window.location.reload();
    }


    return (
        <div className="main">
            <div className="top">
                <p className="header"> {weatherData.name}, {weatherData.sys.country}</p>
                <Button className="button" inverted color="grey" circular icon={icon} onClick={handleClick} />
            </div>
            <div className="flex">
                <p className="temp"> {(isCelsius) ?
                    (`${Math.round(weatherData.main.temp * 1.8 + 32)}°F`)
                    : (`${weatherData.main.temp.toFixed(1)}°C`)}</p>
                <div className="desc-icon">
                    <img alt="weather" className="icon" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
                    <p className="description">{weatherData.weather[0].main}</p>
                </div>
            </div>
            <div className="flex">
                <p className="day"> {moment().format("dddd")}, <span> {moment().format("LL")}</span></p>
                <p className="hum">Humidity: {weatherData.main.humidity}%</p>
            </div>
            <div className="flex">
                <p className="sunrise-sunset">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                <p className="sunrise-sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
            </div>
        </div>
    );
}
