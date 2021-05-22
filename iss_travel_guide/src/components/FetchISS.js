import { useState, useEffect } from 'react'
import DrawMap from './DrawMap/DrawMap'
import TomTomSearch from './TomTomSearch'
import TitleText from './TitleText/TitleText'

function FetchISS() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  useEffect(
    () => fetchISS()
  ,[])

  async function fetchISS() {
    const iss_API = 'https://api.wheretheiss.at/v1/satellites/25544';
    const data = await fetch(iss_API);
    const coords = await data.json()
    .then(() => {
      if(coords) {
        setLat(coords.latitude);
        setLon(coords.longitude);
      }
    }).catch((err) => {
      console.error(err);
    })
    
  }
  
  //setTimeout(() => {fetchISS()}, 3000);
 
  return(
    <div>
      <TitleText />
      <DrawMap lat={lat} lon={lon} />
      <TomTomSearch lat={lat} lon={lon}/>
    </div>
  )
}

export default FetchISS