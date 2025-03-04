const express = require('express')
const app = express()

app.use(express.json());

app.use(express.static('public'))

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: './' });
});

app.listen(3000, () => { console.log("listening on port 3000") });