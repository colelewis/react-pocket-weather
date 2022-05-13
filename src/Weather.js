import React, { Component } from 'react';
import Clock from './components/Clock';
import './bootstrap.min.css';

  // add icons eventually with this: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2

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

  Dashboard = () => { // this works, use this template for building functional components
    const geoData = this.state.geoData;
    if (geoData) {
      return (
        <p>{geoData.main.temp}</p>
      );
    }
  }

  render() {
    return (
      <>
        <div className='container-fluid bg-light mb-0'>
          <h2>react-pocket-weather</h2>
          <p className='lead fs-4 text-wrap'>Your current time and date are: <Clock /></p>
        </div>

        <div className='row container-fluid mx-auto'>
          
          <div className='col bg-primary'> {/*dashboard*/}
            //
          </div>
          <div className='col-5 bg-secondary'>
            //
          </div>
          
        </div>
      </>
    );
  }
}
