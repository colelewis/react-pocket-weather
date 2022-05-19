import React, { Component } from 'react';
import Clock from './components/Clock';
import Dashboard from './components/Dashboard';
import './bootstrap.min.css';
import ManualDashboard from './components/ManualDashboard';

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoData: null,
      manualData: null,
      showManualData: false,
      zip: '',
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

  ManualDashboardWrapper = () => {
    let hide = this.state.showManualData;
    return (
      <>
        <input className='form-control mt-2' placeholder='zip' onChange={i => this.setState({ zip: i.target.value })}></input>
        <input className='form-control mt-3' placeholder='country code, i.e, US' onChange={i => this.setState({ country: i.target.value })}></input>
        <button type='submit' className='btn btn-outline-light mt-3 m-1' value='submit' onClick={() => { this.setState({ showManualData: true }); this.fetchManualData() }}>Get weather.</button>
        <button type='submit' className='btn btn-outline-light mt-3 m-1' value='submit' onClick={() => { this.setState({ showManualData: !hide})}}>Hide</button>
        <ManualDashboard data={this.state} reFetch={this.fetchManualData}/>
      </>
    );
  }

  fetchCoordinates = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject); // HTML5 Geolocation API
    });
  }

  fetchManualData = async () => {
    const MANUAL_API_URL = 'https://api.openweathermap.org/data/2.5/weather?zip=' + this.state.zip + ',' + this.state.country + '&appid=' + process.env.REACT_APP_API_KEY + '&units=' + this.state.units;
    const call = await fetch(MANUAL_API_URL);
    const data = await call.json();
    this.setState({
      manualData: data
    });
    console.log('Weather data manually fetched.');
  }

  fetchGeoData = async (lat, long) => {
    const GEO_API_URL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + process.env.REACT_APP_API_KEY + '&units=' + this.state.units;
    const call = await fetch(GEO_API_URL);
    const data = await call.json();
    this.setState({
      geoData: data
    });
    console.log('Weather data fetched from geolocation.');
  }

  UnitSelector = () => {
    return (
      <div className='dropdown m-3'>
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Units</button>
        <ul className='dropdown-menu' aria-labelledby="dropdownMenuButton1">
          <li><a className="dropdown-item" href="#" onClick={() => { this.setState({ units: 'standard' }); this.CDMWrapper(); console.log('Units changed to standard.') }}>Standard</a></li>
          <li><a className="dropdown-item" href="#" onClick={() => { this.setState({ units: 'metric' }); this.CDMWrapper(); console.log('Units changed to metric.') }}>Metric</a></li>
          <li><a className="dropdown-item" href="#" onClick={() => { this.setState({ units: 'imperial' }); this.CDMWrapper(); console.log('Units changed to imperial.') }}>Imperial</a></li>
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
          <div className='col text-white' style={{ backgroundColor: COLOR_CODE }}>
            <Dashboard data={this.state} />
          </div>
        </div>

        <div className='row mx-auto container-fluid mt-2'>
          <div className='col p-3' style={{ backgroundColor: COLOR_CODE }}>
            {this.ManualDashboardWrapper()}
          </div>
        </div>

        <div className='container-fluid mx-auto fixed-bottom p-2 mt-3' style={{ backgroundColor: COLOR_CODE }}>
          <a href="https://github.com/colelewis/react-pocket-weather"><svg xmlns="http://www.w3.org/2000/svg" width="7%" height="7%" fill="white" className="bi bi-github mx-auto d-block" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg></a>
        </div>
      </>
    );
  }
}
