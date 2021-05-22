import React, { useState, useEffect } from 'react'
import DisplayResults from './DisplayResults/DisplayResults'
import DisplaySearchMenu from './DisplaySearchMenu/DisplaySearchMenu'

function TomTomSearch(props) {
  const {lat, lon} = props;
  const [ radius, setRadius ] = useState(10000);
  const [ keyword, setKeyword ] = useState('food');
  const [ query, setQuery ] = useState({results: 'null'});
  let radios = document.getElementsByName('units');

  useEffect(
    () => getCoords()
  ,[]);

  async function getCoords() {
    let tempRadius = radius;
    if(radios[0].checked) {
      tempRadius = radius * 1609.34;     
    }
    //Fetch TomTom coordinate search endpoint
    const tomtom_API = `https://api.tomtom.com/search/2/search/${keyword}.json?typeahead=false&limit=10&ofs=0&lat=${lat}&lon=${lon}&radius=${tempRadius}&language=en-US&minFuzzyLevel=1&maxFuzzyLevel=2&key=ZO8TcaaYrxWNrZPmiTpIyKepTgr5yPqU`;
    const coordQuery = await fetch(tomtom_API);
    await coordQuery.json()
    .then((queryTemp) => {
      if(queryTemp.results.length !== 0) {
        setQuery(queryTemp);
      } else {
        setQuery({results: 'null'});
        }
      })
  }

  function changeRadius(e) {
    setRadius(e.target.value);
  }
  function changeKeyword(e) {
    setKeyword(e.target.value);
  }
  
  return (
    <div>
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
