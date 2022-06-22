import { render } from '../app.controller.js';
import { mapService } from './map.service.js';
import { storage } from './storage-service.js';
import { makeId } from './utils.services.js';

export const locService = {
    getLocs,
    createLoc,

}

const LOCS_KEY = 'locsDB'




function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var locations = storage.loadFromStorage(LOCS_KEY)
            console.log(locations);
            if (locations) {
                resolve(locations);
            } else {
                const locs = [
                    { name: 'local', lat: 32.047104, lng: 34.832384 },
                    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
                ]
                saveLocs(locs)
                resolve(locs)
            }
            // resolve(locs)
        }, 2000)
    });
}

function createLoc(name, locLngLat) {
    var loc = {
        id: makeId(),
        name,
        lat: locLngLat.lat,
        lng: locLngLat.lng,
        weather: null,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    getLocs().then(locs => {
        locs.push(loc)
        console.log(locs);
        saveLocs(locs)
    })
    render.renderLocs()
}

function saveLocs(locs) {
    console.log('saving locs');
    storage.saveToStorage(LOCS_KEY, locs)
}


function onGoToLoc(lat, lng) {
    return mapService.initMap(lat, lng)
}