const express = require('express')
const app = express();
const port = 3000;

const { listPlaces, listObjects, listScenes } = require('./files');

app.use(express.static(`${__dirname}/assets`));

app.get('/:place/:scene?/objects', (req, res) => {

    if(!req.params.places) {
        res.send("Parametros não preenchidos corretamentes");
        return;
    }

    (listObjects(req.params.place, req.params.scene).then( (a) => {
        res.json({ 
            objects: a
        });
    }));
});

app.get('/places', (req, res) => {
    (listPlaces().then( (a) => {
        res.json({ 
            places: a
        });
    }));
});

app.get('/:places/scenes', (req, res) => {
    if(!req.params.places) {
        res.send("Parametros não preenchidos corretamentes");
        return;
    }

    (listScenes(req.params.places).then( (a) => {
        res.json({ 
            scenes: a
        });
    }));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

