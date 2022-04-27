const url = 'https://my-dream-house-fatec.herokuapp.com';


function places() {
    return fetch(`${url}/places`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}


module.exports = {
    places,
}