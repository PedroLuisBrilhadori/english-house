const get = require('./http');
const place = require('./place');
const grid = document.getElementById('cardGrid')
const main = document.getElementById('main')

document.getElementById('arrowNext').addEventListener('click', () => {
    menuContext.page = 2;
    document.getElementById('0').classList = "";
    document.getElementById('1').classList = "selected";
    while(grid.childNodes.length){
        grid.childNodes.forEach(child => {
            grid.removeChild(child);
        })
    }

    
    showPlaces();
});

document.getElementById('arrowBack').addEventListener('click', () => {
    menuContext.page = 0;
    document.getElementById('0').classList = "selected";
    document.getElementById('1').classList = "";
    
    while(grid.childNodes.length){
        grid.childNodes.forEach(child => {
            grid.removeChild(child);
        })
    }

    showPlaces();
})

const menuContext = {
    scenes: [],
    scenes2: [],
    page: 0,
}

async function getScenes(){ 
    return await get.scenes().then(data => {
        menuContext.scenes = [];
        menuContext.scenes2 = [];
        return data
    });
}

async function constructPlace(){
    return await getScenes().then( data => {
        let i = 1;
        data.forEach(scene => {
            const current = {
                name: getSceneName(scene),
                path: scene,
            }

            if(i <= 8)
                menuContext.scenes.push(current);
            else 
                menuContext.scenes2.push(current);
            i++;
        });
    })
}

function showPlaces(){
    constructPlace().then(a => {

        if(menuContext.page === 0){
            menuContext.scenes.forEach(s => {
                let scene = document.createElement('div');
            
                let name = document.createElement('p');
                name.innerText = `${s.name}`;
    
                scene.appendChild(name);
    
                scene.id = `$${s.name}`;
                scene.classList = 'cardPlace';
                scene.style.backgroundImage = `url(${get.url}/${s.path})`;
                scene.style.backgroundSize = 'cover';
    
                grid.appendChild(scene);
            })        
        } else {
            menuContext.scenes2.forEach(s => {
                let scene = document.createElement('div');
            
                let name = document.createElement('p');
                name.innerText = `${s.name}`;
    
                scene.appendChild(name);
    
                scene.id = `$${s.name}`;
                scene.classList = 'cardPlace';
                scene.style.backgroundImage = `url(${get.url}/${s.path})`;
                scene.style.backgroundSize = 'cover';
    
                grid.appendChild(scene);
            })  
        }
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