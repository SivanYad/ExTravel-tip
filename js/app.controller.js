export const render = { renderLocs }
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onGoToLoc = onGoToLoc;



function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
}




// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetClickPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            mapService.initMap(pos.coords.latitude, pos.coords.longitude)
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

function onGoToLoc(lat, lng){ 
    console.log(1);
}


function renderLocs() {
    locService.getLocs().then(locs => {
        console.log(locs);
        var strHTML = locs.map(loc => {
            return `<tr>
                <td> ${loc.name}</td>
                <td> ${loc.lat}</td>
                <td> ${loc.lng}</td>
                <td><button onclick="onGoToLoc(${loc.lat,loc.lng})">Go</button>
                <td><button onclick="deleteLoc(${loc.lat,loc.lng})">Delete</button>
            
            </tr>`
        }).join('')


        const elTbody = document.querySelector('tbody')
        elTbody.innerHTML=strHTML
    })
}


