
import { Accordion, AccordionItemHeading, AccordionItemPanel, AccordionItem, AccordionItemButton } from "react-accessible-accordion";
import { useState } from "react";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// hello
export default function Forecast({ data }) {
    const dayInWeek = new Date().getDay();
    // readjusts days of weeks to starting from today
    const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInWeek));
    const DATE_INTERVAL = 24 * 60 * 60;
    const initialTime = data.list[0].dt;

    const [active, setActive] = useState(-1);

    function handleOnClick(index) {
        (active == index) ? setActive(-1)
            : setActive(index);
    }
    return <>
        <label className="title"> Daily Forecast</label>
        <Accordion allowZeroExpanded className="accordion"> {data.list.slice().filter((item) => (item.dt - initialTime) % DATE_INTERVAL === 0).map((item, idx) => (
            <AccordionItem key={idx}>
                <AccordionItemHeading>
                    <AccordionItemButton> <div className={(active == idx) ? "daily-item-active" : "daily-item"} onClick={() => handleOnClick(idx)}>
                        <img className="forecast-icon" alt="weather" src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} />
                        <label className="forecast-day">{forecastDays[idx]} </label>
                        <label className="forecast-description">{item.weather[0].description} </label>
                        <label className="min-max">{Math.round(item.main.temp)}°F  </label>
                    </div> </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="daily-detail-grid">
                        <div className="daily-detail-grid-item">
                            <label> Pressure: </label>
                            <label> {item.main.pressure}hPa </label>
                        </div>
                        <div className="daily-detail-grid-item">
                            <label> Humidity: </label>
                            <label> {item.main.humidity}% </label>
                        </div>
                        <div className="daily-detail-grid-item">
                            <label> Clouds: </label>
                            <label> {item.clouds.all}% </label>
                        </div>
                        <div className="daily-detail-grid-item">
                            <label> Wind speed: </label>
                            <label> {Math.round(item.wind.speed)}mph </label>
                        </div>
                        <div className="daily-detail-grid-item">
                            <label> Visibility: </label>
                            <label> {Math.round(item.visibility)}m </label>
                        </div>
                        <div className="daily-detail-grid-item">
                            <label> Feels like: </label>
                            <label> {Math.round(item.main.feels_like)}°F  </label>
                        </div>
                    </div>
                </AccordionItemPanel>
            </AccordionItem >
        ))
        }
        </Accordion >
    </>
}