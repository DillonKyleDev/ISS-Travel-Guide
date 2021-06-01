import React, {useState, useEffect} from 'react'
import TomTomSearch from './TomTomSearch'
import '../body.css'

function FetchISS() {
  const [ coords, setCoords] = useState({lat: null, lon: null});
  const [ effectCall, setEffectCall ] = useState(false);
  
  useEffect(
    () => {
      fetchISS();
    }
  ,[]);

  useEffect(
    () => {
      setTimeout(() => {
        fetchISS();
      }, 3000);
    }
  , [effectCall]);

  function fetchISS() {
    const iss_API = 'https://api.wheretheiss.at/v1/satellites/25544';
    fetch(iss_API)
    .then(results => results.json())
    .then(results => {
      setCoords({lat: results.latitude, lon: results.longitude})
    }).catch(err => {
      console.log(err.message);
    });
    setEffectCall(prev => !prev);
  }

  return(
    <div>
      { coords.lat !== null && coords.lon !== null ? 
      <TomTomSearch coords={coords} /> : null } 
    </div>
  )
}

export default FetchISS
