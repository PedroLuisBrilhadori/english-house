const get = require('./http');
const place = require('./place');
const grid = document.getElementById('cardGrid')
const main = document.getElementById('main')
const menu = document.getElementById('menu');

const back = require('./background');

document.getElementById('arrowNext').addEventListener('click', () => {
    menuContext.page = 2;
    document.getElementById('0').classList = "";
    document.getElementById('1').classList = "selected"

    removeImages();
    showPlaces();
});

document.getElementById('arrowBack').addEventListener('click', () => {
    menuContext.page = 1;
    document.getElementById('0').classList = "selected";
    document.getElementById('1').classList = "";

    
    removeImages();
    showPlaces();
})

const menuContext = {
    scenes: [],
    page: 1,
    pageSize: 8,
    menu: true,
}

function showMenu() {
    const i = main.childElementCount;
    
    if(menuContext.menu){
        while(main.childElementCount === i)
            main.removeChild(menu);
    } else{
        main.appendChild(menu);
        showPlaces();
    } 
    
    menuContext.menu = !menuContext.menu;
}

async function getScenes(){ 
    return await get.scenes().then(data => {
        removeImages();
        menuContext.scenes = [];
        menuContext.scenes2 = [];
        return data
    });
}

async function constructPlace(){
    return await getScenes().then( data => {
        data.forEach(scene => {
            const current = {
                name: getSceneName(scene),
                path: scene,
                place: getPlaceName(scene),
            }
    
            menuContext.scenes.push(current);
        });
    })
}

function showPlaces(){    
    if(menuContext.menu)
    constructPlace().then(a => {
        const trimStart = (menuContext.page - 1) * 8;
        const trimEnd = trimStart + 8;
        const items = menuContext.scenes.splice(trimStart, trimEnd);


        items.forEach(item => {
            grid.appendChild(createScene(item));
        })

    })
}

function createScene(s) {
    let scene = document.createElement('div');
            
    let name = document.createElement('p');
    name.innerText = `${s.name}`;

    scene.appendChild(name);

    scene.id = `$${s.name}`;
    scene.classList = 'cardPlace';
    scene.style.backgroundImage = `url(${get.url}/${s.path})`;
    scene.style.backgroundSize = 'cover';

    scene.addEventListener('click', () => {
        place.clearObjects();
        place.setPlace(s.place);
        place.setScene(s.name);
        back.getBackgroundImage();
        showMenu();
    })

    return scene;
}

module.exports = { 
    showPlaces,
    showMenu
}

function removeImages() {
    grid.textContent = '';    
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

function getPlaceName(obj){    
    let object = String(obj);
    object = object.replace('assets/places/', '');
    
    let name = '';

    for(let i = 0; object[i] !== '/'; i++){
        name += object[i];
    }

    return name;
}