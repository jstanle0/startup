class Post {
    constructor(username, type, message, imageSrc) {
        this.username = username;
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
        setInterval(()=> {
            const username = randomElement(['Suzy', 'Bill', 'Todd', 'KillerMan47', 'Donkey Kong'])
            const type = randomElement(['reward', 'goal'])
            const message = randomElement(['I finally finished it!', 'I love this webiste!!', 'This was really hard', 'I hate fortnite'])
            const imageSrc = randomElement(['/images/ferrari.jpeg', '/images/space.jpeg', '/images/lawnmower.jpeg', '/images/camera.jpeg'])

            this.brodcastPost(username, type, message, imageSrc)
        }, 5000)
    }
    brodcastPost(username, type, message, imageSrc) {
        const post = new Post(username, type, message, imageSrc)
        this.recievePost(post)
    }
    recievePost(post) {
        this.posts.push(post)
        this.handlers.forEach((handler) => handler(post))
    }
    addHandler(handler) {
        this.handlers.push(handler)
    }
    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler)
    }
}
const Notifier = new PostNotifer()
export {Notifier}