import express from 'express'
import dbConnect from './config/dbConnection.js';
import dotenv from 'dotenv/config'
import route from "./routes/userRoute.js"
import routes from "./routes/noteRoute.js"
import fs from 'fs'

const app = express();
app.use(express.json());

const PORT = process.env.PORT


const dir = './uploads';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

app.use("/",route)
app.use("/note",routes)

app.listen(PORT,() => {
    console.log(`Server up at ${PORT}`);
    
})

dbConnect();