import express from 'express'
import dbConnect from './config/database.js';
import dotenv from 'dotenv'
import route from "./routes/dataRoute.js"

const app = express();
app.use(express.json());

dotenv.config({ path: '.env' }); 

const PORT = process.env.PORT

app.use("/",route)

app.listen(PORT,() => {
    console.log(`Server up at ${PORT}`);
    
})

dbConnect();