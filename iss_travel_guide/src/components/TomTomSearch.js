import React, { useState, useEffect } from 'react'
import DisplayResults from './DisplayResults'


function TomTomSearch(props) {
  const {lat, lon} = props;
  const [ radius, setRadius ] = useState(10000);
  const [ keyword, setKeyword ] = useState('food');
  const [ query, setQuery ] = useState('null');
  let radios = document.getElementsByName('units');

  useEffect(
    () => getCoords()
  ,[]);

  async function getCoords() {
    let tempRadius = radius;
    if(radios[0].checked) {
      tempRadius = radius * 1609.34;     
    }
    //Fetch tomtom coordinate search endpoint
    const tomtom_API = `https://api.tomtom.com/search/2/search/${keyword}.json?typeahead=false&limit=10&ofs=0&lat=${lat}&lon=${lon}&radius=${tempRadius}&language=en-US&minFuzzyLevel=1&maxFuzzyLevel=2&key=ZO8TcaaYrxWNrZPmiTpIyKepTgr5yPqU`;
    const coordQuery = await fetch(tomtom_API);
    let queryTemp = await coordQuery.json();
    setQuery(queryTemp);
    if(query.results[0] === undefined) {
      console.log('ISS didn"t find anything around there');
      console.log(query.results);
    } else {
      console.log('Found some stuff!');
      console.log(query.results);
      }
  }
  function changeRadius(e) {
    setRadius(e.target.value);
  }
  function changeKeyword(e) {
    setKeyword(e.target.value);
  }
  
  return (
    <div>
      <div id='search box'>
        <label>Search Radius </label>
        <input type='text' value={radius} onChange={e => changeRadius(e)}></input>
        <input type='radio' name='units' value='Miles' defaultChecked></input>
        <label>Miles</label>
        <input type='radio' name='units' value='Meters'></input>
        <label>Meters</label>
        <br />
        <label> Search Keyword </label>
        <input type='text' value={keyword} onChange={e => changeKeyword(e)}></input>
        <br />
        <button onClick={getCoords}>Submit</button>
      </div>
      <DisplayResults query={query}/>
    </div>
  )
}

export default TomTomSearch
