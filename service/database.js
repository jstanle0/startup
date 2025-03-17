const {MongoClient} = require('mongodb');
const config = require('./dbconfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostName}`;

const client = new MongoClient(url);
const db = client.db('ShootForTheStars');
const userCollection = db.collection('users');

(async function testConnection() {try {
    await db.command({ping: 1})
    console.log(`DB connect to ${config.hostName}`);
} catch (ex) {
    console.log(`Error with ${config.hostName}, ${ex.message}`);
    process.exit(1);
}})();

async function createUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({email: user.email},{$set: user})
}

function getUser(username) {
    return userCollection.findOne({username: username});
}


module.exports = {
    createUser,
    getUser,
    updateUser,
}