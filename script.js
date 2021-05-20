//Defining the Leaflet map object we will be using
let mymap = L.map('issMap').setView([0,0], 3);
mymap.setMinZoom(3);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(url, { attribution });
tiles.addTo(mymap);

//Defining the satellite icon to use on map
const myIcon = L.icon({
  iconUrl: 'satellite.png',
  iconSize: [100,100],
  iconAnchor: [50,50],
});
let marker = L.marker([0,0], {icon: myIcon}).addTo(mymap);

//Options for TomTom search
const options = {
  searchOptions: {
    key: 'ZO8TcaaYrxWNrZPmiTpIyKepTgr5yPqU',
    language: 'en-US',
    limit: 10,
  }
}
 //Search radius
 let radius = 10000;
 
/*
//Create search box instance and append to body
let ttSearchBox = new tt.plugins.SearchBox(tt.services, options);
let searchBoxHTML = ttSearchBox.getSearchBoxHTML();
document.body.appendChild(searchBoxHTML);
searchBoxHTML.style.marginBottom = '100px';
*/

async function getCoords() {
  //Fetch ISS coordinates
  const iss_API = 'https://api.wheretheiss.at/v1/satellites/25544';
  const satCoords = await fetch(iss_API);
  const data = await satCoords.json();
  const lat = data.latitude;
  const lon = data.longitude;

 
  //Fetch tomtom coordinate search endpoint
  const tomtom_API = `https://api.tomtom.com/search/2/search/food.json?typeahead=false&limit=10&ofs=0&lat=${lat}&lon=${lon}&radius=${radius}&language=en-US&minFuzzyLevel=1&maxFuzzyLevel=2&key=ZO8TcaaYrxWNrZPmiTpIyKepTgr5yPqU`;
  const coordQuery = await fetch(tomtom_API);
  const returnedResult = await coordQuery.json();

 if(returnedResult.results[0] == undefined) {
    console.log('undefined console.log');
    radius *= 10;
  }
  console.log(returnedResult.results);

  //assign ISS Coords to Leaflet satellite marker
  document.getElementById('lat').innerHTML = lat;
  document.getElementById('lon').innerHTML = lon;
  mymap.setView([lat, lon]);
  marker.setLatLng([lat, lon]);
}
setInterval(() => getCoords(), 1000);





