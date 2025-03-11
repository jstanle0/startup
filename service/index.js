const express = require('express')
const app = express()

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'))

const apiRouter = express.Router()
app.use('/api', apiRouter)

apiRouter.post('/account/create', async (req, res) => {
    res.status(200).send({name: "hi"})
})

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => { console.log(`listening on port ${port}`) });