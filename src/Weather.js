import React, { Component } from 'react';
import Clock from './components/Clock';
import { parseUnits } from './Auxiliary';
import './bootstrap.min.css';

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoData: null,
      manualData: null,
      zip: 0,
      country: '',
      units: 'metric'
    };
  }

  componentDidMount() {
    this.fetchCoordinates()
      .then((position) => {
        this.fetchGeoData(position.coords.latitude, position.coords.longitude)
      })
      .catch((error) => console.log(error));
  }

  componentDidUpdate(prevState) {
    if (this.state.units !== prevState.units) {
      // this.componentDidMount();
      // this.render();
    }
  }

  fetchCoordinates = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  fetchManualData = async () => {
    const MANUAL_API_URL = 'https://api.openweathermap.org/data/2.5/weather?zip=' + this.state.zip + ',' + this.state.country + '&appid=' + process.env.REACT_APP_API_KEY;
    const call = await fetch(MANUAL_API_URL);
    const data = await call.json();
    this.setState({
      manualData: data
    });
  }

  fetchGeoData = async (lat, long) => {
    const GEO_API_URL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + process.env.REACT_APP_API_KEY + '&units=' + this.state.units;
    const call = await fetch(GEO_API_URL);
    const data = await call.json();
    this.setState({
      geoData: data
    });
  }

  convertUnix(utime) {
    return new Date(utime * 1000).toLocaleString();
  }

  Dashboard = () => { // this works, use this template for building functional components
    const geoData = this.state.geoData;
    // console.log(geoData);
    if (geoData) {
      const ICON_URL = 'http://openweathermap.org/img/wn/' + geoData.weather[0].icon + '.png';
      return (
        <div className='container-fluid p-1 text-white'>
          <img className='mb-2' src={ICON_URL}></img>
          <p style={{float: 'right'}} className='lead p-2 mb-3'>{geoData.weather[0].description}</p>
          <div className='row'>

            <div className='col p-2'>
              <h6 className='lead text-truncate'>Your coordinates are: ({geoData.coord.lat}, {geoData.coord.lon}).</h6>              
            </div>

            <div className='col mx-auto p-1'>
              <p className='lead'>Current temperature is {geoData.main.temp} {parseUnits(this.state.units)}.</p>
              <p className='lead'>It feels like {geoData.main.feels_like} {parseUnits(this.state.units)}.</p>
              <p className='lead'>Pressure: {geoData.main.pressure} hPa</p>
              <p className='lead'>Humidity: {geoData.main.humidity}%</p>
              <p className='lead'>Visibility: {geoData.main.visibility} meters.</p>

            </div>

          </div>
        </div>
      );
    }
  }

  Outlook = () => {

  }

  render() {
    return (
      <>
        <div className='container-fluid bg-light mb-0'>
          <h2>react-pocket-weather</h2>
          <p className='lead fs-4 text-wrap'>Your current time and date are: <Clock /></p>
          <div className='dropdown p-3 m-3'>
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Units</button>
            <ul className='dropdown-menu' aria-labelledby="dropdownMenuButton1">
              <li><a className="dropdown-item" href="#" onClick={() => {this.setState({ units: 'standard'})}}>Standard</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => {this.setState({ units: 'metric'})}}>Metric</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => {this.setState({ units: 'imperial'})}}>Imperial</a></li>
            </ul>
          </div>
        </div>

        <div className='row container-fluid mx-auto'>
          <div className='col bg-primary'>
            {this.Dashboard()}
          </div>
        </div>
      </>
    );
  }
}
