import express from "express";
import http from "http";
import bodypaser from "body-parser";
import cookieparser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose"
import router from './router'

const app = express();

// Usually, you use it when your frontend needs to send things like cookies or authentication credentials to your backend.
app.use(cors({
    credentials: true
}));


// this makes the request being sent smaller
app.use(compression());

// is used in Express to add cookie-parsing middleware to your application.
app.use(cookieparser());

// is an Express middleware that tells your server to read JSON data sent in the request body.
app.use(bodypaser.json());

app.use('/', router());

const server = http.createServer(app)

server.listen(8080, ()=>{
    console.log('welcome to lagos');
});

const MONGO_URL = `mongodb+srv://ujunwastephenebuka_db_user:TGnkzYp3avzqlFy5@cluster0.xgbxzoh.mongodb.net/`
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
.then(() => console.log('database connected successful'))
.catch((error) => console.log(error));

// another way of catching error
mongoose.connection.on('error', (error : Error) => console.log(error));