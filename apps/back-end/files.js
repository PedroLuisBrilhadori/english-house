const fs = require('fs').promises;

async function listarArquivosDoDiretorio(diretorio, arquivos) {

    if(!arquivos)
        arquivos = [];

    let listaDeArquivos = await fs.readdir(diretorio);
    for(let k in listaDeArquivos) {
        let stat = await fs.stat(diretorio + '/' + listaDeArquivos[k]);
        if(stat.isDirectory())
            await listarArquivosDoDiretorio(diretorio + '/' + listaDeArquivos[k], arquivos);
        else
            arquivos.push(diretorio + '/' + listaDeArquivos[k]);
    }

    return arquivos;

}


async function listPlaces() {
    let places = await listarArquivosDoDiretorio(`${__dirname}/assets/places`); // coloque o caminho do seu diretorio
    let aux = [];
    let index = 0;

    places.forEach((place) => { 
        let noDirname = place.replace(`${__dirname}/assets/places/`, '');
        let nameObj = '';

        for(let i = 0; noDirname[i] !== '/'; i++){
            nameObj += noDirname[i];
        }

        if(!aux.includes(String(nameObj))){
            aux[index] = nameObj;
            index++;
        }
    });

    return aux;
}

async function listObjects(place) {
    let objects = await listarArquivosDoDiretorio(`${__dirname}/assets/objects/${place}`); // coloque o caminho do seu diretorio
    let aux = [];
    let index = 0;

    objects.forEach((object) => { 
        let noDirname = object.replace(`${__dirname}/assets/objects/${place}`, '');

        aux[index] = noDirname;
    });

    return aux;
}


module.exports = {
    listPlaces,
    listObjects,
}