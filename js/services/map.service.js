import { render } from '../app.controller.js'
import { MAPS_API_KEY } from './keys.service.js'
import { locService } from './loc.service.js'


export const mapService = {
  initMap,
  addMarker,
  panTo,
}

var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
  console.log('InitMap')
  return _connectGoogleApi().then(() => {
    // var  locations=storage.loadFromStorage(locService.LOCS_KEY)
    console.log('google available')
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 18,
      
    })
    var marker = new google.maps.Marker({
      position:  { lat, lng },
      map: gMap,

    })
    console.log('Map!', gMap)
    window.google.maps.event.addListener(gMap, 'click', (event) => {
      console.log(event.latLng.lng())
      var latLng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      }
      let infoWindow = new google.maps.InfoWindow({
        content: `Your Position is ${JSON.stringify(latLng)}`,
        position: latLng,
      });
      infoWindow.open(gMap);
      var name = prompt('Please give a name to the selected location')
      console.log(latLng)
      locService.createLoc(name, latLng)
    })
  
    render.renderLocs()
   
  })
}


function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'Hello World!',
  })
  return marker
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  const API_KEY = MAPS_API_KEY //TODO: Enter your API Key
  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () => reject('Google script failed to load')
  })
}

