import React, { Component } from 'react';
import { parseUnits, parseSpeed, convertUnix } from "../Auxiliary";

export default class ManualDashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data.units !== this.props.data.units) {
            this.props.reFetch();
        }
    }

    render() {
        if (this.props.data.manualData && this.props.data.showManualData) {
            const manualData = this.props.data.manualData;
            const ICON_URL = 'http://openweathermap.org/img/wn/' + manualData.weather[0].icon + '.png';
            return (
                <div className='container-fluid p-1 text-white mb-5'>
                    <img className='mb-2' src={ICON_URL}></img>
                    <p style={{ float: 'right' }} className='lead p-2 mb-3'>{manualData.weather[0].description}</p>
                    <div className='row'>

                        <div className='col p-1 lead'>
                            <p>Provided coordinates are: ({manualData.coord.lat}, {manualData.coord.lon}).</p>
                            <p>Sunrise: {convertUnix(manualData.sys.sunrise)}</p>
                            <p>Sunset: {convertUnix(manualData.sys.sunset)}</p>

                            <div className='mt-5'> {/* wind */}
                                <h5>Wind speed is currently {manualData.wind.speed} {parseSpeed(this.props.data.units)} at {manualData.wind.deg} degrees.</h5>
                            </div>

                        </div>

                        <div className='col-4 mx-auto lead'>
                            <p>Current temperature is {manualData.main.temp} {parseUnits(this.props.data.units)}.</p>
                            <p>It feels like {manualData.main.feels_like} {parseUnits(this.props.data.units)}.</p>
                            <p>Pressure: {manualData.main.pressure} hPa</p>
                            <p>Humidity: {manualData.main.humidity}%</p>
                            <p>Visibility: {manualData.visibility} meters.</p>
                            <p>Cloudiness: {manualData.clouds.all}%</p>
                        </div>

                    </div>
                </div>
            );
        }
    }
}