import React, { useState, useEffect } from 'react'
import TitleText from './TitleText/TitleText'
import DrawMap from './DrawMap/DrawMap'
import DisplaySearchMenu from './DisplaySearchMenu/DisplaySearchMenu'
import DisplayResults from './DisplayResults/DisplayResults'


function TomTomSearch(props) {
  const {coords} = props;
  const [ radius, setRadius ] = useState(1000);
  const [ keyword, setKeyword ] = useState('food');
  const [ query, setQuery ] = useState({results: 'null'});
  let radios = document.getElementsByName('units');

  function getCoords() {
  let tempRadius = radius;
  if(radios[0].checked) {
    tempRadius = radius * 1609.34;     
  }
  //Fetch TomTom coordinate search endpoint
  const tomtom_API = `https://api.tomtom.com/search/2/search/${keyword}.json?typeahead=false&limit=12&ofs=0&lat=${coords.lat}&lon=${coords.lon}&radius=${tempRadius}&language=en-US&minFuzzyLevel=1&maxFuzzyLevel=2&key=ZO8TcaaYrxWNrZPmiTpIyKepTgr5yPqU`;
  fetch(tomtom_API)
  .then(coordQuery => {
    console.log(coords.lat, coords.lon);
    if(coordQuery.ok) {
    return coordQuery.json();
    } else return([])
  })
  .then(queryTemp => {
    if(queryTemp.results.length !== 0) {
      setQuery(queryTemp);
    } else {
      setQuery({results: 'nothing'});
      }
    })
  }

  useEffect(
    () => {
      getCoords();
    }
  , []); // eslint-disable-line react-hooks/exhaustive-deps

  function changeRadius(e) {
    setRadius(e.target.value);
  }
  function changeKeyword(e) {
    setKeyword(e.target.value);
  }
  
  return (
    <div>
      <TitleText />
      <DrawMap lat={coords.lat} lon={coords.lon} query={query}/>
      <DisplaySearchMenu 
      changeRadius={e => changeRadius(e)}
      changeKeyword={e => changeKeyword(e)}
      getCoords={getCoords}
      radius={radius}
      keyword={keyword}/>
      <DisplayResults query={query}/>
    </div>
  )
}

export default TomTomSearch
