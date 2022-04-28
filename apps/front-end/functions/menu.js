const get = require('./http');
const place = require('./place');
const grid = document.getElementById('cardGrid')
const main = document.getElementById('main')
const menu = document.getElementById('menu');

document.getElementById('arrowNext').addEventListener('click', () => {
    menuContext.page = 2;
    document.getElementById('0').classList = "";
    document.getElementById('1').classList = "selected"
    removeImages();
    showPlaces();
});

document.getElementById('arrowBack').addEventListener('click', () => {
    menuContext.page = 0;
    document.getElementById('0').classList = "selected";
    document.getElementById('1').classList = "";

    
    removeImages();
    showPlaces();
})

const menuContext = {
    scenes: [],
    scenes2: [],
    page: 0,
    menu: true,
}

function showMenu() {
    const i = main.childElementCount
    
    if(menuContext.menu){
        while(main.childElementCount === i)
            main.removeChild(menu);
        menuContext.menu = !menuContext.menu;
    } else{
        menuContext.menu = !menuContext.menu;
        main.appendChild(menu);
        showPlaces();
    } 
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
        let i = 1;
        data.forEach(scene => {
            const current = {
                name: getSceneName(scene),
                path: scene,
                place: getPlaceName(scene),
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
    if(menuContext.menu)
    constructPlace().then(a => {
        if(menuContext.page === 0){
            menuContext.scenes.forEach(s => {
                grid.appendChild(createScene(s));
            })        
        } else {
            menuContext.scenes2.forEach(s => {
                grid.appendChild(createScene(s));
            })  
        }
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
        console.log(s.name);
    })

    return scene;
}

module.exports = { 
    showPlaces,
    showMenu
}

function removeImages() {
    while(grid.childNodes.length){
        grid.childNodes.forEach(child => {
            grid.removeChild(child);
        })
    }
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