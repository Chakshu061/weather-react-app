import React from "react"
import { forecasteType } from "../temp"
import { getHumidityValue, getPop, getSunTime, getVisibilityValue, getWindDirection } from "./helper"
import Sunrise from "./icons/Sunrise"
import Sunset from "./icons/Sunset"
import Tile from "./Tile"

type Props = {
    data: forecasteType
}

const Degree = ({ temp }: { temp: number }): JSX.Element => (
    <span>
        {temp}°
    </span>
)

const Forecast = ({ data }: Props):JSX.Element => {
    const today = data.list[0]
    return(
        <div className="container">
            <div className="">
                <section className="name">
                    <h2>{data.name}, <span>{data.country}</span></h2>
                    <h1><Degree temp={Math.round(today.main.temp)} /></h1>
                    <p>
                        {today.weather[0].main} {today.weather[0].description}
                    </p>
                    <p>
                        H: <Degree temp={Math.ceil(today.main.temp_max)} /> {"  "}L: <Degree temp={Math.floor(today.main.temp_min)} />
                    </p>
                </section>
                <section className="list">
                    {data.list.map((item, i) => (
                        <div key={i}>
                            <p>{i===0 ? 'Now' : new Date(item.dt * 1000).getHours()}</p>
                            <img 
                               alt={`weather-icon-${item.weather[0].description}`}
                               src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} 
                            />
                            <p>
                                <Degree temp={Math.round(item.main.temp)} />
                            </p>
                        </div>
                    ))}
                </section>
                <section className="tiles">
                    <div className="sunrise"><Sunrise/><span>{getSunTime(data.sunrise)}</span></div>
                    <div className="sunset"><Sunset/><span>{getSunTime(data.sunset)}</span></div>
                </section>
                <section className="tile-2">
                    <Tile 
                        icon="wind"
                        title="Wind"
                        info={`${Math.round(today.wind.speed)} km/h`}
                        description={`${getWindDirection(
                          Math.round(today.wind.deg)
                        )}, gusts 
                        ${today.wind.gust.toFixed(1)} km/h`}
                    />
                    <Tile
                        icon="feels"
                        title="Feels like"
                        info={<Degree temp={Math.round(today.main.feels_like)} />}
                        description={`Feels ${
                          Math.round(today.main.feels_like) < Math.round(today.main.temp)
                            ? 'colder'
                            : 'warmer'
                        }`}
                    />
                    <Tile
                        icon="humidity"
                        title="Humidity"
                        info={`${today.main.humidity} %`}
                        description={getHumidityValue(today.main.humidity)}
                    />
                    
                    <Tile
                        icon="pop"
                        title="Precipitation"
                        info={`${Math.round(today.pop * 100)}%`}
                        description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
                    />
                    <Tile
                        icon="pressure"
                        title="Pressure"
                        info={`${today.main.pressure} hPa`}
                        description={` ${
                          Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
                        } than standard`}
                    />
                    <Tile
                        icon="visibility"
                        title="Visibility"
                        info={`${(today.visibility / 1000).toFixed()} km`}
                        description={getVisibilityValue(today.visibility)}
                    />
                </section>
            </div>
        </div>
    )
}

export default Forecast