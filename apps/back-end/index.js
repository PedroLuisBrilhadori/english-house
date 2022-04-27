const express = require('express')
const app = express();
const port = 3000;

const { listPlaces, listObjects } = require('./files');

app.use(express.static(`${__dirname}/assets`));

app.get('/:place/objects', (req, res) => {
    (listObjects(req.params.place).then( (a) => {
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

