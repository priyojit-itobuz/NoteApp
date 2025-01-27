import express from 'express'
import dbConnect from './config/dbConnection.js';
import dotenv from 'dotenv/config'
import route from "./routes/userRoute.js"
import routes from "./routes/noteRoute.js"

const app = express();
app.use(express.json());



const PORT = process.env.PORT

app.use("/",route)
app.use("/note",routes)

app.listen(PORT,() => {
    console.log(`Server up at ${PORT}`);
    
})

dbConnect();