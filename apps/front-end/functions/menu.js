const get = require('./http');

function showPlaces(){
   get.places().then(places => console.log(places));
}


module.exports = { 
    showPlaces
}