import React from 'react'
import './displaySearchMenu.css'

function DisplaySearchMenu(props) {
  const {changeRadius, changeKeyword, getCoords, radius, keyword} = props;
  
  return (
    <div>
      <div id='searchBox'>

        <div id='radios'>
          <input type='radio' name='units' value='Miles' defaultChecked></input>
          <label>Miles</label>
          <input type='radio' name='units' value='Meters'></input>
          <label>Meters</label>
        </div>

        <div id='inputsDiv'>
          <div className='input'>
            <label>Search Radius </label>
            <input type='text' value={radius} onChange={e => changeRadius(e)}></input>
          </div>
          <div className='input'>
            <label> Search Keyword </label>
            <input type='text' value={keyword} onChange={e => changeKeyword(e)}></input>
          </div>
        </div>
       
        <button onClick={getCoords}>Submit</button>
      </div>
    </div>
  )
}

export default DisplaySearchMenu