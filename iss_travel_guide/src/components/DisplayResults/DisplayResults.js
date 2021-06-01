import React from 'react'
import './displayResults.css'


function DisplayResults({ query }) {
 let formedList = 'Thinking...';
 if(query.results !== 'null' && query.results !== 'nothing' && query.results !== undefined) {
  formedList = query.results.map(locale => 
    <div key={locale.id} className='locale'>
      <ul>
      
      {locale.poi && locale.poi.name ?
      <li><span className='liName'>Name:</span> 
      <span className='liInfo'> {locale.poi.name}</span></li> 
      : null} 

      {locale.address ? 
      <li><span className='liName'>Location:</span>
        <ul id='address'>
          {locale.address.freeformAddress ? 
          <li><span className='liInfo'>{locale.address.freeformAddress}</span></li> : null }
          {locale.address.streetName ? 
          <li><span className='liInfo'><span className='liName'>Street:</span> {locale.address.streetName}</span></li> : null }
          {locale.address.countrySubdivision ?
          <li><span className='liInfo'>{locale.address.countrySubdivision}, {locale.address.country}, {locale.address.postalCode}</span></li> : null }
        </ul> 
      </li>
      : null}

      {locale.poi && locale.poi.phone ? 
      <li><span className='liName'>Phone Number:</span> 
      <span className='liInfo'> {locale.poi.phone}</span></li>
      : null}
        
      {(locale.poi && locale.poi.url) && (locale.poi.url.indexOf('://') > 0 || locale.poi.url.indexOf('//') === 0) ? 
      <li><span className='liName'>Website:</span> 
      <span className='liInfo'> <a href={locale.poi.url}>{locale.poi.url}</a></span></li>
      : null}
      
      {(locale.poi && locale.poi.url) && !(locale.poi.url.indexOf('://') > 0 || locale.poi.url.indexOf('//') === 0) ? 
      <li><span className='liName'>Website:</span> 
      <span className='liInfo'> <a href={`http://${locale.poi.url}`}>{locale.poi.url}</a></span></li>
      : null}
        


      {locale.poi && locale.poi.categories.length > 0 ? 
      <li><span className='liName'>Tags:</span>  
      <span className='liInfo'>{
        locale.poi.categories.map((category, index) => 
          <div key={index}>
            <ul>
              <li>
                <span className='tags'>{category}</span>
              </li>
            </ul>
          </div>
        )
      }</span></li>
      : null}

      {locale.type ? 
      <li><span className='liName'>Location Type:</span>
      <span className='liInfo'> {locale.type}</span></li> 
      : null }

      </ul>
    </div>
 )} else if (query.results === 'null') {
    formedList = 
    <div className='locale'>
      <ul>
        <li>
          <span className='liName'>Loading...</span>
          <br />
          Please wait...
        </li>

      </ul>
    </div>
    } else {
    formedList = 
      <div className='locale'>
        <ul>
          <li>
            <span className='liName'>The ISS couldn't find anything close by.</span>
            <br />
            Try increasing the search radius or changing
            the keyword.
          </li>

        </ul>
      </div>
    }

  return (
    <div>
      <div id="displayResults">
        {formedList}
      </div>
    </div>
  )
}

export default DisplayResults