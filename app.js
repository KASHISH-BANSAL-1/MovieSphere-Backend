const express  = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose =  require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoutes')
dotenv.config()
const PORT = process.env.PORT|| 8001;
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/movie')
  .then(() => console.log('Database Connected!'))
  .catch((err)=>{console.log("Error while connection DB",err);
  })
  
app.use(express.urlencoded({extended:true}))

app.use(userRoute)

app.listen(PORT,()=>{
    console.log(`Sever connected at ${PORT}`);
    
})
