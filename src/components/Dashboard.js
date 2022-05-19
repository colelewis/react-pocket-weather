import React, { Component } from 'react';
import { parseUnits, parseSpeed, convertUnix } from "../Auxiliary";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const geoData = this.props.data.geoData;
        // console.log(geoData);
        if (geoData) {
            const ICON_URL = 'http://openweathermap.org/img/wn/' + geoData.weather[0].icon + '.png';
            return (
                <div className='container-fluid p-1'>
                    <img className='mb-2' src={ICON_URL}></img>
                    <p style={{ float: 'right' }} className='lead p-2 mb-3'>{geoData.weather[0].description}</p>
                    <div className='row'>

                        <div className='col p-1 lead'>
                            <p>Your coordinates are: ({geoData.coord.lat}, {geoData.coord.lon}).</p>
                            <p className='mt-2'>Sunrise: {convertUnix(geoData.sys.sunrise)}</p>
                            <p className='mt-2'>Sunset: {convertUnix(geoData.sys.sunset)}</p>

                            <div className='mt-4'> {/* wind */}
                                <h5>Wind speed is currently {geoData.wind.speed} {parseSpeed(this.props.data.units)} at {geoData.wind.deg} degrees.</h5>
                                <p>Gust speed is at {geoData.wind.gust} {parseSpeed(this.props.data.units)}.</p>

                            </div>

                        </div>

                        <div className='col-4 mx-auto lead'>
                            <p>Current temperature is {geoData.main.temp} {parseUnits(this.props.data.units)}.</p>
                            <p>It feels like {geoData.main.feels_like} {parseUnits(this.props.data.units)}.</p>
                            <p>Pressure: {geoData.main.pressure} hPa</p>
                            <p>Humidity: {geoData.main.humidity}%</p>
                            <p>Visibility: {geoData.visibility} meters.</p>
                            <p>Cloudiness: {geoData.clouds.all}%</p>
                        </div>

                    </div>
                </div>
            );
        } else {
            return (
                <p className='p-3'>Geolocation data is not available right now.</p>
            );
        }
    }
}