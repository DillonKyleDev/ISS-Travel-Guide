import React, { useState } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import SetMapView from '../SetMapView'
import './drawMap.css'
import satellite from '../images/satellite.png'

function DrawMap(props) {
  const {lat, lon} = props;
  //Custom Icon
  const myIcon = L.icon({
    iconUrl: satellite,
    iconSize: [100,100],
    iconAnchor: [50,50],
  });
  const [map, setMap] = useState(null);
  const mapContainer =
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
        <Marker 
          position={[lat, lon]} 
          icon={myIcon}
        />
    </MapContainer>
       

  return (
    <div>    
      {map ? <SetMapView map={map} lat={lat} lon={lon}/> : null}
      <div id="mapContainer">
        {mapContainer}
      </div>
    </div>
  )
}

export default DrawMap