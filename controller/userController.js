const User = require("../model/User");
const bcryptjs = require('bcryptjs');

const signup= async(req,res)=>{
    try {
        const {fullname, email,password} = req.body; // req ki body se data lia
        const user = await User.findOne({email}); // email se check kra lia h ki ni
        if(user){
            return res.status(400).json({msg:"user already exist"}) // hai toh error msg
        }
        const hashPassword = await bcryptjs.hash(password,10);
        const createUser = new User({ // vrna new user banaya
            fullname: fullname,
            email : email,
            password: hashPassword
        })
       await createUser.save() // database m save kia
        res.status(201).json({msg:"User created successfully"}) // new user bn gya

    } catch (error) {
        console.log(error.msg);
        res.status(500).json({msg: "internal server error"})
    }
}

const  login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!user || !isMatch){
            res.status(400).json({msg:"Invalid username or password"})
        }
        else{
            res.status(200).json({msg: "Login Successfully", user:{
                _id: user._id,
                fullname: user.fullname,
                email: user.email
            }})
        }
        
    } catch (error) {
        console.log("error"+ error.msg);
        
        
    }

}




module.exports ={ signup,login};