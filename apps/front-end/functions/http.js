const url = 'https://my-dream-house-fatec.herokuapp.com';
const headers = {
    'Content-Type': 'application/json',
}


async function places() {
    return await fetch(`${url}/places`, {
        headers: headers
    })
    .then(response => response.json())
    .then(data => {
        return data.places;
    })
    .catch(error => console.error(error));
}

async function search(param) {
    return await fetch(`${url}/${param}/path`, {
        headers: headers,
    })
    .then(response => response.json())
    .then(data => {
        return data.files;
    })
    .catch(error => console.error(error));
}


module.exports = {
    places,
    search,
    url
}