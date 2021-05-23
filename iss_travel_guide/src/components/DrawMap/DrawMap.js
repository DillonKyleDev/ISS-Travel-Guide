import React, { useState } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import SetMapView from './SetMapView'
import './drawMap.css'
import satellite from '../images/satellite.png'

function DrawMap(props) {
  const {lat, lon, query} = props;
  let mapContainer;
  let queryIsNull = true;

  if(query.results !== 'null') {
    queryIsNull = false;
  }
  //Custom Icon
  const myIcon = L.icon({
    iconUrl: satellite,
    iconSize: [100,100],
    iconAnchor: [50,50],
  });
  
  const [map, setMap] = useState(null);
  if(lat !== 0 && lon !== 0) {
   mapContainer =
    <MapContainer id="map" 
      center={[lat, lon]} 
      zoom={1}
      whenCreated={setMap}
      setMaxZoom={3}
      minZoom={3}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        { !queryIsNull ? 
        query.results.map(locale => 
          <Marker key={locale.id}
          position={[locale.position.lat, locale.position.lon]}>

            <Popup>
            { locale.poi && locale.poi.name ?
            `Name: ${locale.poi.name}` : null } <br />
            { locale.address && locale.address.freeformAddress ? 
            `Location: ${locale.address.freeformAddress}` : null } <br />
            { locale.type ? 
            `Location Type: ${locale.type}` : null }
            </Popup>

          </Marker>          
        ): null }
        <Marker 
          position={[lat, lon]} 
          icon={myIcon} />
    </MapContainer>
  }

  return (
    <div>    
      {map ? <SetMapView map={map} /> : null}
      <div id="mapContainer">
        { mapContainer ? mapContainer : null }
      </div>
    </div>
  )
}

export default DrawMap