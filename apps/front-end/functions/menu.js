const get = require('./http');
const place = require('./place');
const grid = document.getElementById('cardGrid')

const menuContext = {
    scenes: [],
    page: 0,
    pageSize: 8,
}

async function getScenes(){ 
    return await get.scenes().then(data => {
        return data
    });
}

async function constructPlace(){
    return await getScenes().then( data => {
        data.forEach(scene => {
            const current = {
                name: getSceneName(scene),
                path: scene,
            }

            menuContext.scenes.push(current);
        });
    })
}

function showPlaces(){
    constructPlace().then(a => {
        let scene = document.createElement('div');
    })
}


module.exports = { 
    showPlaces
}


function getSceneName(obj){    
    let object = String(obj);

    if(!object.includes('.jpg')){
        return obj;
    }

    let name = '';
    
    for(let i = object.indexOf('.jpg') -1; object[i] !== '/'; i--) {
        name += object[i];   
    }

    return name.split('').reverse().join('');
}