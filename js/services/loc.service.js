import { render } from '../app.controller.js';
import { storage } from './storage-service.js';
import { makeId } from './utils.services.js';

export const locService = {
    getLocs,
    createLoc,

}

const LOCS_KEY = 'locsDB'



const locs = [
    { name: 'local', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var locations = storage.loadFromStorage(LOCS_KEY)
            console.log(locations);
            if (locations || locations.length) {
                resolve(locations);
            } else resolve(locs)

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
    locs.push(loc)
    console.log(locs);
    saveLocs()
  
    
    // return loc
}

function saveLocs() {
    console.log('saving');
    storage.saveToStorage(LOCS_KEY, locs)
}
