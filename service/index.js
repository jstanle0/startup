const express = require('express');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const cookieParser = require('cookie-parser');
const DB = require('./database');
const app = express();
const { peerProxy } = require('./peerProxy');
const imageServer = require('./imageServer')

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router()
app.use('/api', apiRouter)

//Verification Middleware
const verify = async (req, res, next) => {
    const user = await findUser('token', req.cookies['token'])
    res.locals.user = user
    if (user) {
        next();
    } else {
        res.status(401).send({msg: 'unauthorized'})
    }
}
//Home
apiRouter.post('/home/goal', verify, async (req, res)=> {
    const user = res.locals.user;
    user.goals.push(req.body.goal);
    DB.updateUser(user)
    res.status(200).send({goal: req.body.goal.name});
})
apiRouter.get('/home/goals', verify, async (req, res)=>{
    const user = res.locals.user;
    res.status(200).send({goals: user.goals})
})
apiRouter.delete('/home/goal', verify, async (req, res) => {
    const user = res.locals.user;
    user.recentEvents = setRecentEvents(user, user.goals[req.body.index], "goal");
    user.goals.splice(req.body.index, 1);
    user.starCount += req.body.starChange;
    await DB.updateUser(user);
    res.status(200).send({goals: user.goals});
})
apiRouter.get('/home/starCount', verify, async (req,res)=>{
    const user = res.locals.user;
    if (!user.starCount) {
        user.starCount = 0;
        await DB.updateUser(user);
    }
    res.status(200).send({starCount: user.starCount});
})
apiRouter.get('/home/reward', verify, async (req, res) => {
    const user = res.locals.user;
    res.status(200).send({reward: user.reward})
})
apiRouter.post('/home/reward', verify, async (req, res)=>{
    const user = res.locals.user;
    if (req.body.starChange) {
        user.starCount += req.body.starChange;
        user.recentEvents = setRecentEvents(user, user.reward, "reward")
    }
    user.reward = req.body.reward;
    await DB.updateUser(user)
    res.status(200).send({reward: user.reward})
})
//Community
function setRecentEvents(user, event, name) {
    if (!user.recentEvents) {
        user.recentEvents = []
    }
    let newRecentEvents = [[name, event], ...user.recentEvents]
    if (newRecentEvents.length > 5) {
        newRecentEvents = newRecentEvents.slice(0, 5);
    }
    return newRecentEvents
}
apiRouter.get('/community/recentEvents', verify, async (req, res) => {
    const user = res.locals.user;
    res.status(200).send({recentEvents: user.recentEvents})
})
apiRouter.post('/community/post', verify, async (req, res) =>{
    let post = req.body.post
    post.timestamp = new Date()
    DB.addPost(post)
    res.status(200).send({msg: 'websocket placeholder'})
})
apiRouter.get('/community/posts', async (req, res) => {
    res.status(200).send({msg: 'websocket placeholder'})
})

//Login
apiRouter.post('/account/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(409).send({ msg: "Existing user" })
        
    } else {
        passwordHash = await bcrypt.hash(req.body.password, 10)
        const user = {
            username: req.body.username, 
            password: passwordHash,
            goals: [],
        }
        await DB.createUser(user)
        res.status(200).send({user: user.username})
    }
})

apiRouter.post('/account/login', async (req, res) => {
    const user = await findUser('username', req.body.username)
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
        res.cookie('token', user.token, {secure:true, httpOnly:true, sameSite:'strict'})
        await DB.updateUser(user)
        res.status(200).send({user: user.username})
        return
    }
    res.status(409).send( { msg: "Invalid credentials" } ) 
})

apiRouter.delete('/account/logout', async (req, res) => {
    const user = await findUser('token', req.cookies['token'])
    if (user) {
        delete user.token
        DB.updateUser(user)
    }
    res.clearCookie('token')
    res.status(200).send({msg:'Log out successful'})
})


//Errors
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

//Functions
async function findUser(field, value) {
    if (!value) return null;
    if (field == 'token') {
        return await DB.getUserByToken(value)
    }
    return await DB.getUser(value);
}

(async function testAWS() {
    await imageServer.uploadFile('test.txt', 'Hello S3!');
    const data = await imageServer.readFile('test.txt');

    console.log(data);
})()
const server = app.listen(port, () => { console.log(`listening on port ${port}`) });

peerProxy(server)