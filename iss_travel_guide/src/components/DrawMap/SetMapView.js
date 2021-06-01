import React from 'react'



function SetMapView(props) {
  const { map } = props;
  map.setView([map.getCenter().lat, map.getCenter().lng]);
  return (
    <div>
      
    </div>
  )
}

export default SetMapView