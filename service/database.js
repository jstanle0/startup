const {MongoClient} = require('mongodb');
const config = require('./dbconfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostName}`;

const client = new MongoClient(url);
const db = client.db('ShootForTheStars');
const userCollection = db.collection('users');
let postCollection = null;

(async function testConnection() {try {
    await db.command({ping: 1})
    console.log(`DB connect to ${config.hostName}`);
    postCollection = await db.createCollection(
        "posts",
        {
           timeseries: {
              timeField: "timestamp",
              metaField: "metadata",
              granularity: "hours"
           },
           expireAfterSeconds: 10,
        }
    );
} catch (ex) {
    console.log(`Error with ${config.hostName}, ${ex.message}`);
    process.exit(1);
}})();

async function createUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({_id: user._id},{$set: user})
}

function getUser(username) {
    return userCollection.findOne({username: username});
}

function getUserByToken(token) {
    return userCollection.findOne({token: token});
}

async function addPost(post) {
    await postCollection.insertOne(post)
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    getUserByToken,
    addPost,
}