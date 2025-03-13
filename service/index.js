const express = require('express')
const app = express()

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'))

const apiRouter = express.Router()
app.use('/api', apiRouter)

const users = []

apiRouter.post('/account/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(409).send({msg: "existing user"})
        
    } else {
        const user = {
            username: req.body.username, 
            password: req.body.password,
        }
        users.push(user)
        console.log(users)
        res.status(200).send(user)
    }
})
//
apiRouter.post('/account/login', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(200).send({msg: 'good job'})
        return
    }
    res.status(409).send({msg: "Invalid credentials"}) 
})

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

async function findUser(field, value) {
    if (!value) return null;
    const u = users.find((user)=>user[field]===value);
    console.log(u);
    return u;
}

app.listen(port, () => { console.log(`listening on port ${port}`) });