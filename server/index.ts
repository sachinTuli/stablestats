import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import router from './routes';
require('dotenv').config();

const app = express();

const APP_PORT = process.env.APP_PORT || 3000;
const MONGO_URL = process.env.MONGOOSE_URL as string;

app.use(session({
    secret: "sessionSecret",
    resave: true,
    saveUninitialized: true
}));

app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

require('./config/passport')(passport);

mongoose.connect(MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err)=>{
    if(err) throw err;
    console.log("connected");
});

app.use(router);
if(process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.get('/', function(req, res, next){
    res.sendStatus(200);
});
app.listen(APP_PORT, () => {
    console.log('Hello baby welcome to my world!');
    console.log("app port",process.env.APP_PORT);
})