# Simple Chat App

This is a simple chat app using React and Socket.IO. 

It has a single chat room. Users can join the chat and immediately post and view messages. 

Messages are emitted back to the Socket.IO server, and from there broadcast to all other users in the chat. Thanks to the magic of sockets, that process is fast and messages are visible more or less immediately by all chat participants.

The current user and chat history are stored in localstorage. The user is cleared when the user leaves the chat. Chat history is cleared from localstorage approximately every hour. 

# Live Demo

See live demo here: [https://telly-chat-app.netlify.app/](https://telly-chat-app.netlify.app/)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.