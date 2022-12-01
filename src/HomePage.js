import './HomePage.css';
import { useState, useEffect } from "react";
import Listing from './components/Listing.js';
import Graph from './components/Graph.js';
import Logo from './assets/airbnbLogo.png';

const HomePage = () => {

  const [API, setAPI] = useState('http://127.0.0.1:5000/1/2/1/0/0/0/0/1');

  useEffect(() => {
    const getApi = () => {

      setLoading(true);

      fetch(API)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setLoading(false);
          setApiData(data);
        });
    };
    getApi();
  }, [API]);

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [graphType, setGraphType] = useState("line");
  const [graphColor, setGraphColor] = useState("pink");
  const [superhost, setSuperhost] = useState(0);
  const [instantBooking, setInstantBooking] = useState(0);
  const [verified, setVerified] = useState(0);
  const [availability, setAvailability] = useState(1);
  const [minNights, setMinNights] = useState("1");
  const [totalGuests, setTotalGuests] = useState("2");
  const [minRating, setMinRating] = useState("0");
  const [minBeds, setMinBeds] = useState("1");
  const rListings = [];
  const graphData = [];

  if(!loading){
    apiData.forEach((data)=>{
      var money = Number(data[40].replace(/[^0-9.-]+/g, ""));
      rListings.push(<Listing name={data[5]} link={data[1]} host={data[11]} rating={data[61]} sPrice={data[40]} dPrice={money} imgUrl={data[8]} hostImgUrl={data[20]} hostLink={data[10]} location={data[13]} />);
      if(money > 0){
        graphData.push({x: rListings.length-1, y: money});
      }
    })
  }  

  const set = () => {
    setAPI('http://127.0.0.1:5000/' + minBeds + '/' + totalGuests + '/' + minNights + '/' + verified + '/' + superhost + '/' + instantBooking + '/' + minRating + '/' + availability);
  }

  const clear = () => {
    setMinRating("0");
    setMinNights("1");
    setMinBeds("1");
    setTotalGuests("2");
    setSuperhost(0);
    setVerified(0);
    setInstantBooking(0);
    setAvailability(1);
    set();
  }

  const checkState = (index) => {
    switch(index){
      case 0:
          if(superhost === 0){
            return false;
          }
        return true;
      case 1:
          if(verified === 0){
            return false;
          }
        return true;
      case 3:
        if(availability === 0){
          return false;
        }
       return true;
      default:
        if(instantBooking === 0){
          return false;
        }
        return true;
    }
  }

  const handleCheck = (index) => {
    switch(index){
      case 0:
        if(superhost === 0){
          setSuperhost(1);
        }
        else{
          setSuperhost(0);
        }
        break;
      case 1:
          if(verified === 0){
            setVerified(1);
          }
          else{
            setVerified(0);
          }
        break;
      case 3:
        if(availability === 0){
          setAvailability(1);
        }          
        else{
           setAvailability(0);
        }
        break;
      default:
        if(instantBooking === 0){
          setInstantBooking(1);
        }
        else{
          setInstantBooking(0);
        }
        break;
    }
  }

  return (
    <div className="container">
      <header className="header">
          <img className="logo" src={Logo} alt="logo"/>AirBnB Listings 
        <div className="buttons">
          <button onClick={set}>Set Filters</button>
          <button onClick={clear}>Clear Filters</button>
        </div>
      </header>
      <div className="filterContainer">
        <label>
            Minimum Rating:{' '}
            <input type="text" value={minRating} onChange={(e)=>{setMinRating(e.target.value)}}/>
        </label>
        <label>
            Minimum Nights:{' '}
            <input type="text" value={minNights} onChange={(e)=>{setMinNights(e.target.value)}}/>
        </label>
        <label>
            Minimum Beds:{' '}
            <input type="text" value={minBeds} onChange={(e)=>{setMinBeds(e.target.value)}}/>
        </label>
        <label>
            Total Guests:{' '}
            <input type="text" value={totalGuests} onChange={(e)=>{setTotalGuests(e.target.value)}}/>
        </label>
      </div>
      <div className="filterContainer">
        <label>
            <input type="checkbox" checked={checkState[1]} onChange={() => handleCheck(1)} />
            {' '}Verified Host
        </label>
        <label>
            <input type="checkbox" checked={checkState[0]} onChange={() => handleCheck(0)} />
            {' '}Superhosted
        </label>
        <label>
            <input type="checkbox" checked={checkState[2]} onChange={() => handleCheck(2)}/>
            {' '}Instant Booking
        </label>
        <label>
            <input type="checkbox" defaultChecked="true" checked={checkState[3]} onChange={() => handleCheck(3)}/>
            {' '}Has Availability
        </label>
      </div>
      {loading === true ? (
        <div>
          <header className="header">Loading...</header>
        </div>
      ) : ( 
        <div className="subContainer">
        <div className="subInnerContainer">
          <label className="subheader">
            Listings
          </label> <p />
          <div className="listingsContainer">
            {rListings}
          </div>
        </div>
        <div className="subInnerContainer">
          <div className="graphContainer">
            <label className="subheader">
              Graph - Nightly Price/Listing
            </label> <p />
            <select value={graphColor} onChange={(e)=>{setGraphColor(e.target.value)}}>
              <option value="instr" disabled>Select Graph Color</option>
              <option value="pink">Pink</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="yellow">Yellow</option>
              <option value="red">Red</option>
              <option value="lightgreen">Green</option>
            </select>
            <select value={graphType} onChange={(e)=>{setGraphType(e.target.value)}}>
              <option value="instr" disabled>Select Graph Type</option>
              <option value="line">Line</option>
              <option value="scatter">Scatter</option>
              <option value="bar">Bar</option>
            </select>
          </div>
          <Graph graphData={graphData} type={graphType} color={graphColor} />
        </div>
      </div>
      )}
    </div>
  );
}

export default HomePage;
