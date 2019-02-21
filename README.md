# Palindrome
This a NodeJS + React App that takes user input and see if the input is Palindrome. The app can store all past entries and their posted time. The user would have the ability to remove any entry by a click of a button. The app users MERN stack and MVVM architecture.

## How to start the server

1. [Make sure MongoDB is installed](https://docs.mongodb.com/v3.2/administration/install-community/), and start mongoDB by typing `mongod` in the command line. 

1. Make sure Node and NPM are installed by typing `node -v` in the command line. If NPM is not installed please proceed to [this page](https://nodejs.org/en/download/) to install Node.

1. Clone or download the repo to the local machine.

1. `cd` to the folder where the backend is in, for example, `cd ~/Downloads/Palindrome/backend` or cd `C:\\GitHub\Palindrome\backend`

1. Install project dependency by typing in `npm install`.

1. Start the server by typing `npm start`.

1. Open a new terminal tab

1. `cd` to the folder where the frontend code is in, for example, `cd ~/Downloads/Palindrome/frontend` or cd `C:\\GitHub\Palindrome\frontend`.

1. Install project dependency by typing in `npm install`.

1. Start the server by typing `npm start`.

1. Visit the app from [localhost:3000](http://localhost:3000)

## Technology
### Architecture
### Backend
- [Node.js](http://nodejs.org)
- [Express.js](https://expressjs.com)
  
Node.js and Express.js are used to setup routing and request handling. With the help of other open source NPM packages. 

### Front-end
- [Bootstrap](https://getbootstrap.com)
- [Moment.js](http://momentjs.com)

Bootstrap is used as the UI framework, it provides tons of features to make web application adapt to different screen sizes and aspect ratios.


### Hosting Platform
- [Linode](https://www.linode.com)

The Application will be hosted on Linode, a cloud platform that provides fast Linux server, the benefit of using Linode is versatility and scalability. Many CPU, memory, and server location configurations are available to choose based on different needs. 


### Database:
MongoDB is a non-relational database designed to be high-performance and easy to implement,  the NPM package Mongoose is used connect to the database and perform Create, Read, Delete operations.


### Privisioning Tool
- [PM2](http://pm2.keymetrics.io)

### API Doc:
The API documentation is stored as `Palindrome.postman_collection.json` in the root folder. Make sure [Postman](https://www.getpostman.com/apps) is installed and import the JSON file as a collection. You can start the API request right from Postman
  

### Sequence diagram
Can be found in the roor folder `sequenceDiagram.pdf`.