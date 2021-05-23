import { useState } from 'react'
import TomTomSearch from './TomTomSearch'
import '../body.css'

function FetchISS() {
  const [ coords, setCoords] = useState({coords: [0,0]});

  function fetchISS() {
    const iss_API = 'https://api.wheretheiss.at/v1/satellites/25544';
    fetch(iss_API)
    .then(results => {
      if(results.ok) {
      return(results.json())
      } else return({coords: [0,0]});
    })
    .then(results => {
      setCoords({coords: [results.latitude, results.longitude]});
    }).catch(err => {
      console.log(err.message);
    })
  }
  
  setTimeout(() => fetchISS(), 2000);

  return(
    <div>
      { coords.coords[0] !== 0 && coords.coords[1] !== 0 ? 
      <TomTomSearch coords={coords.coords} /> : null }       
    </div>
  )
}

export default FetchISS

/*

*/