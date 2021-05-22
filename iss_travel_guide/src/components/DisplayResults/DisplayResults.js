import React from 'react'
import './displayResults.css'


function DisplayResults({ query }) {
 let formedList = 'Thinking...';
 console.log(query.results[0]);
 if(query.results !== 'null' && query.results !== undefined) {
  formedList = query.results.map((locale, index) => 
    <div key={locale.poi.name + index} className='locale'>
      <ul>

      {locale.poi.name ? <li><span className='liName'>Name:</span> 
      <span className='liInfo'> {locale.poi.name}</span></li> : null} 

      {locale.address.streetName ? 
      <li><span className='liName'>Street:</span>
        <ul id='address'>
          <li><span className='liInfo'>{locale.address.streetName}</span></li>
          <li><span className='liInfo'>{locale.address.countrySubdivision}, {locale.address.country}, {locale.address.postalCode}</span></li>
        </ul> 
      </li>
      : null}

      {locale.poi.phone ? 
      <li><span className='liName'>Phone Number:</span> 
      <span className='liInfo'> {locale.poi.phone}</span></li>
      : null}
        
      {locale.poi.url ? 
      <li><span className='liName'>Website:</span> 
      <span className='liInfo'> <a href={locale.poi.url}>{locale.poi.url}</a></span></li>
      : null}
        {/*check if it has a poi and then perform that.
        Do a check for every 'type' and display results for it.
        */}
      {locale.poi.categories.length > 0 ? 
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
      </ul>
    </div>
 )} else {
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