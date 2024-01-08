import './App.css';
import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import { Dimmer, Loader } from "semantic-ui-react";
import SearchBar from "./components/SearchBar";


export default function App({ ilat = "", ilong = "" }) {
  const REACT_APP_API_URL = 'https://api.openweathermap.org/data/2.5'
  const REACT_APP_API_KEY = '107c5d550237c450dcf13cdb4d61fbd0'


  const [lat, setLat] = useState(ilat);
  const [long, setLong] = useState(ilong);
  const [data, setData] = useState([]);
  const [forecastData, setForecastData] = useState([]);

  // runs on first render and any time lat or long changes
  useEffect(() => {
    if (!lat) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      })
    };
    const fetchCurrentData = async () => {
      await fetch(`${REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&units=metric&appid=${REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setData(result);
          console.log(result);
        });
    }
    fetchCurrentData();
    const fetchForecastData = async () => {
      await fetch(`${REACT_APP_API_URL}/forecast?lat=${lat}&lon=${long}&units=imperial&appid=${REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setForecastData(result);
          console.log(result);
        });
    }
    fetchForecastData();
  }, [lat, long])


  function onSelect(inputValue) {
    const value = inputValue.split(" ");
    setLat(value[0]);
    setLong(value[1]);
  }


  return (
    <div className="App">
      {((typeof data.main != 'undefined') && (forecastData.message === 0)) ?
        (<div className="content">
          <SearchBar onSelect={onSelect} />
          <Weather weatherData={data}> </Weather>
          <Forecast data={forecastData} />
        </div>)
        : (<div>
          <Dimmer active>
            <Loader> Loading...</Loader></Dimmer>
        </div>)}
    </div>
  );
}


