import React, { Component } from 'react';
import { parseUnits, convertUnix } from "../Auxiliary";

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
                            <p>Sunrise: {convertUnix(geoData.sys.sunrise)}</p>
                            <p>Sunset: {convertUnix(geoData.sys.sunset)}</p>

                            <div className='mt-4'> {/* wind */}
                                <h5>Wind</h5>
                                <svg xmlns="http://www.w3.org/2000/svg" width="8%" height="8%" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/></svg>
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
        }
    }
}