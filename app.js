const express   = require('express');
const bodyParser= require('body-parser');
const mongoose  = require('mongoose');
const path      = require('path');
const cors      = require('cors');
const dotenv    = require('dotenv');
const router    = require('./routes/users.route');
const passport  = require('passport');
const app       = express();
const { EventEmitter } = require("events");
const { createServer } = require("http");
const  { Server }  = require("socket.io");
const io = require("socket.io-client");




dotenv.config();
//LINUX
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
require('./config/passport')(passport)
app.listen(process.env.PORT, ()=> {
console.log('Server is running on port :' + process.env.PORT);
});
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=> {
    console.log("Connected to DB");
})
.catch((err)=> console.log(err.message))

global.ee = new EventEmitter();

const ioServer = createServer();
global.io = new Server(ioServer);
require("./io");

const portIO = 4040

ioServer.listen(portIO, () => {
    console.log(`Socket.IO at port ${portIO}`);
  });

app.use('/',router)
