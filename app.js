const express  = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose =  require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoutes')
dotenv.config()
const PORT = process.env.PORT|| 8001;

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("DB Connected")})
.catch((err)=>{console.log("connection error",err)}) 


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(userRoute)
app.get('/',(req,res)=>{
    res.send("moviesearch");
})
app.listen(PORT,()=>{
    console.log(`Sever connected at ${PORT}`);
    
})
