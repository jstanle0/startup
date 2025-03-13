const express = require('express')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const cookieParser = require('cookie-parser')
const app = express()

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router()
app.use('/api', apiRouter)

const users = []

apiRouter.post('/account/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(409).send({ msg: "Existing user" })
        
    } else {
        passwordHash = await bcrypt.hash(req.body.password, 10)
        const user = {
            username: req.body.username, 
            password: passwordHash,
        }
        users.push(user)
        res.status(200).send({user: user.username})
    }
})
//
apiRouter.post('/account/login', async (req, res) => {
    const user = await findUser('username', req.body.username)
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
        res.cookie('token', user.token, {secure:true, httpOnly:true, sameSite:'strict'})
        res.status(200).send({user: user.username})
        return
    }
    res.status(409).send( { msg: "Invalid credentials" } ) 
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
    return u;
}

app.listen(port, () => { console.log(`listening on port ${port}`) });