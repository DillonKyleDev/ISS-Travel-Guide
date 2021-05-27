
## The Unofficial ISS Travel Guide ##
##
This project was started with the idea of mastering APIs and React hooks in mind.  It started as a simple project that would display the location of the International Space Station on a map in real time, but turned into:

"An unofficial travel guide that lets you follow the International Space Station on its journey around the world! Visit all the places it's likely to recommend! *wink*"
-------------------------------------------------------
## A little more context ##
After getting the project to the initial idea, I felt it needed an interactive element, so I started thinking of clever ways to take this project a step further.  Enter reverse geocoding!
I had the idea to use reverse geocoding, (which I had yet to discover the name of), to plunk in some coordinates and get some nearby locations back.

This application uses three different APIs to achieve all of its goals, although two would have been sufficient!

## Important Note: ##
  This project takes inspiration from a Coding Train Youtube video series that uses the same concept of creating a map to illustrate the ISS orbit path.  That video, however, only used vanilla Javascript, not React, and finishes after getting the ISS to track on a map.
  --Video linked at the bottom of the ReadMe.--

Let's get into the components!  Firstly, the 

## FetchISS.js ##
React component uses the API provided by https://wheretheiss.at/ to fetch the current coordinates of the International Space station every three seconds.  It then sends that information to its child component,

## TomTomSearch.js ##
 which takes advantage of another API, the TomTom map/search API, to perform what is called a "Fuzzy search" for locations in a given ##radius## that share a common ##keyword##.

For more information on the specific search used by the TomTom API you can visit their websites developer section here:
https://developer.tomtom.com/content/search-api-explorer#/Search/get_search__versionNumber__search__query___ext_

And for IBMs explanation of what a fuzzy search is exactly, you can go here:
https://www.ibm.com/docs/en/informix-servers/14.10?topic=modifiers-fuzzy-searches

After the TomTomSearch.js component fetches an array of locations with distinctive information, it sends the array with all of the location information to a few other components:

First, the
## DrawMap.js ##
component.  This component fetches from the Leaflet API to draw a map with current ISS coordinates as its center point.  
More information on the Leaflet library can be found here: https://leafletjs.com/

This map includes the location of the ISS specifically, as well as twelve markers, one for each location returned from the TomTomSearch API call.
Every time the coordinates are updated, which is every three seconds, in this case, the ISS map and marker positions are redrawn, but the ISS marker is the only marker who's position changes at that interval; 
the rest of the markers position states are fixed until a new search is submitted from the second component TomTomSearch sends data to, the

## DisplaySearchMenu.js ##
component.  This component provides the means for user interaction! How exciting! It provides a few input fields:

-Units to be used
-Search radius desired
-Keyword to search for
-And the all-powerful 'Submit' button

Users enter data into the fields and as you might expect, when the submit button is pressed, the current coordinates of the ISS are used in a brand new fuzzy TomTomSearch to locate locations nearby those coordinates.

But I'm getting ahead of myself!  When the application is first loaded, a call to the TomTom API is made with the initail coordinates of the ISS in order to populate the page with results immediately.  Then, at any point, the user may start a new search by either entering new information, or by simply reclicking the Submit button.

And where does all of this search information go, you ask?  How does the user recieve this information?  Well that is the sole responsibility of a the last component our TomTomSearch.js sends information to, the:

## DisplayResults.js ##
Component.  This component recieves the entire TomTomSearch.js query json and conditionally (if it exists) displays all relevant information in the form of content cards.  Included information includes (if a particular location has them):

Name
Street Name
Free-form-address
Country Subdivision
Phone Number
Website Url
All Categories Listed
Location Type, ie. 'POI' or 'Point of Interest', 'Geography', 'Street'

## Challenges Faced ##
This project was a great teacher of React component structure, React Hooks, and API utilization.  Although the process of implementing my desired features generally went well, I admittedly faced some difficulties when it came to React hooks, specifically the useEffect hook and the three second timing interval I was implementing in the application.  My React knowledge is still developing, so I was still wrapping my head around the component lifecycle method and what role hooks play in that lifecycle.

It took a LOT of trial and error and research to eventually figure out how to properly implement a timer in React without creating an infinite loop.  That was far and away my largest challenge I faced while writing this application.  And I walked away with a much better understanding of the React component lifecycle and how useEffect and useState are used in tandem to create dynamic and intelligent component logic.


-----------------------------------------------------------------
Thank you to Dan at The Coding Train for the inspiration for this application.  He has a fantastic channel on Youtube and somehow makes learning coding concepts even more enjoyable!
## Coding Train Youtube API Series ##
https://www.youtube.com/watch?v=uxf0--uiX0I&list=RDCMUCvjgXvBlbQiydffZU7m1_aw&start_radio=1&rv=uxf0--uiX0I&t=4&ab_channel=TheCodingTrain
