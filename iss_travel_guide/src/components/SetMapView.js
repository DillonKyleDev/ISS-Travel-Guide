import React from 'react'



function SetMapView(props) {
  const { map, lat, lon } = props;
  map.setView([lat, lon]);

  return (
    <div>
      
    </div>
  )
}

export default SetMapView