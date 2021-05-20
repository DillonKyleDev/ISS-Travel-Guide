import { useState, useEffect } from 'react'
import DrawMap from './DrawMap'
import TomTomSearch from './TomTomSearch'

function FetchISS() {
  const [lat, setLat] = useState(50);
  const [lon, setLon] = useState(0);
  useEffect(
    () => fetchISS()
  ,[])

  async function fetchISS() {
    const iss_API = 'https://api.wheretheiss.at/v1/satellites/25544';
    const data = await fetch(iss_API);
    const coords = await data.json();
    setLat(coords.latitude);
    setLon(coords.longitude);
  }
  
  //setTimeout(() => {fetchISS()}, 3000);
 
  return(
    <div>
      <DrawMap lat={lat} lon={lon} />
      <TomTomSearch lat={lat} lon={lon}/>
    </div>
  )
}

export default FetchISS