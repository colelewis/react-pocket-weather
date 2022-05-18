import React, { Component } from 'react';
import Clock from './components/Clock';
import Dashboard from './components/Dashboard';
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

  CDMWrapper() { // used to make new API call when units change
    this.fetchCoordinates()
      .then((position) => {
        this.fetchGeoData(position.coords.latitude, position.coords.longitude)
      })
      .catch((error) => console.log(error));
  }

  fetchCoordinates = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject); // HTML5 Geolocation API
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

  UnitSelector = () => {
    return (
      <div className='dropdown m-3'>
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Units</button>
        <ul className='dropdown-menu' aria-labelledby="dropdownMenuButton1">
          <li><a className="dropdown-item" href="#" onClick={() => { this.setState({ units: 'standard' }); this.CDMWrapper() }}>Standard</a></li>
          <li><a className="dropdown-item" href="#" onClick={() => { this.setState({ units: 'metric' }); this.CDMWrapper() }}>Metric</a></li>
          <li><a className="dropdown-item" href="#" onClick={() => { this.setState({ units: 'imperial' }); this.CDMWrapper() }}>Imperial</a></li>
        </ul>
      </div>
    );
  }

  render() {
    const COLOR_CODE = '#4e73ad'; // to eventually be provided by a function to provide a color from the time
    return (
      <>
        <div className='container-fluid bg-light mb-0 p-2'>
          <h2>react-pocket-weather</h2>
          <p className='lead fs-4 text-wrap'>Your current date and time are: <Clock /></p>
          {this.UnitSelector()}
        </div>

        <div className='row container-fluid mx-auto'>
          <div className='col text-white' style={{backgroundColor: COLOR_CODE}}>
            <Dashboard data={this.state} />
          </div>
        </div>
        
      </>
    );
  }
}
