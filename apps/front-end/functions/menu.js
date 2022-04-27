const get = require('./http');

function showPlaces(){
    get.places().then(res => {
        res.json().then(data => {
            console.log(data);
        })
    })
}


module.exports = { 
    showPlaces
}