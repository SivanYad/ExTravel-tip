export const locService = {
    getLocs,
    createLoc
}


import { MAPS_API_KEY } from './keys.service.js';
import { makeId  } from './utils.services.js';


const gCachelocs = [
    // { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    // { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function createLoc(name ,locLngLat) {
    var loc = {
        id: makeId(),
        name,
        lat: locLngLat.lat,
        lng: locLngLat.lng,
        weather: null,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    console.log(loc)
    return loc
}


