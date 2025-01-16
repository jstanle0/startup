# Shoot for the Stars

[My Notes](notes.md)

A goal-based self motivation website


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Many of us have a lot of different things that we want to get done, but lack the self-motivation to complete it. Shoot for the Stars is a solution to that! Just pick a thing you want, and Shoot for the Stars will help you use it as a motivator to achieve your goals and start good habits. With a simple and intuitve design, it'll keep you coming back until you achieve everything you'd hoped, if not more!

### Design

![Design image](/assets/images/sketch1.jpeg)
![Design image 2](/assets/images/sketch2.jpeg)
![Design image 3](/assets/images/sketch3.jpeg)

As can be seen in these images, there will be 3 main pages. A simple login page, a home page, and a community page. Each can be accessed by a bar on the top of the screen. Attempting to use the home page without logging in will redirect the user to the login page. On the home page, the individual elements will be dynamically rendered, as the user enters them, as react elements. There will also be a star counter that automatically updates as the user completes goals. The community page will use the same goal/reward elements as the home page, just changed slightly to show that it has been achieved and a space to write a note.  
This diagram represents how the server recieves and resends community posts.
```mermaid
sequenceDiagram
    actor Bill
    actor Susan
    actor Tom
    participant Server
    Bill ->> Server: Bill's post
    Server ->> Susan: Bill's post
    Server ->> Tom: Bill's post
```

### Key features

- __Treat yourself!__ Pick a reward, write a discription of it, add a photo -- Whatever helps you remember why your're achieving your goals.
- __Set goals!__ Set goals to earn stars, with customization for repeating or long-term goals.
- __Share with friends!__ Proud of your achivements? Post them to the community on the community board!

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structures to create a login, home, and community page
- **CSS** - Simplistic, appealing application design that adapts to a variety of screen sizes
- **React** - Dynamically rendered goal, reward, and community elements, as well as login system
- **Service** - Backend service components including:
    - Placeholder images for users that don't want to upload their own
    - Secure password management
    - Other necessary site functions :grin:
- **DB/Login** - Securly store:
    - User login information
    - The goals, rewards, and star values of each account
    - Community posts for a certain amount of time
- **WebSocket** - Live updates to the community board

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://startup.shootforthestars.click/).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
