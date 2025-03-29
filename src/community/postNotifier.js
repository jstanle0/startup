class Post {
    constructor(username, name, type, message, imageSrc) {
        this.username = username;
        this.name = name;
        this.type = type;
        this.message = message;
        this.imageSrc = imageSrc;
    }
}
const randomElement = (list) => {
    return list[Math.floor(Math.random() * list.length)];
}
class PostNotifer {
    constructor() {
        this.posts = [];
        this.handlers = [];
        this.isPaused = false;
        this.connected = false;

        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`)

        this.socket.onopen = (event) => {
            this.connected=true
            console.log("connected!")
            //this.notifyObservers()
        }
        /*setInterval(()=> {
            const username = randomElement(['Suzy', 'Bill', 'Todd', 'KillerMan47', 'Donkey Kong'])
            const name = randomElement(['mow lawn', 'ferrari', 'win lottery', 'camera'])
            const type = randomElement(['reward', 'goal'])
            const message = randomElement(['I finally finished it!', 'I love this webiste!!', 'This was really hard', 'I hate fortnite'])
            const imageSrc = randomElement(['/images/ferrari.jpeg', '/images/space.jpeg', '/images/lawnmower.jpeg', '/images/camera.jpeg'])
            this.brodcastPost(username, name, type, message, imageSrc)
        }, 5000)*/
    }
    brodcastPost(username, name, type, message, imageSrc) {
        const post = new Post(username, name, type, message, imageSrc)
        this.recievePost(post)
    }
    recievePost(post) {
        if (!this.isPaused) {
        this.posts.push(post)
        this.handlers.forEach((handler) => handler(post))
        }
    }
    pause(){
        this.isPaused=true
    }
    resume(){
        this.isPaused=false
    }
    addHandler(handler) {
        this.handlers.push(handler)
    }
    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler)
    }
}
const Notifier = new PostNotifer()
export {Notifier, Post}