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

mongoose.set('strictQuery', false)
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Database Connected');
    }
    catch (err) {
        console.log(err);

        console.log('Database Connection failed');

    }
}
app.use(express.urlencoded({extended:true}))

app.use(userRoute)

app.listen(PORT,()=>{
    console.log(`Sever connected at ${PORT}`);
    
})
