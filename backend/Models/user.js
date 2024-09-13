const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type : String,
        required : true,
    },
    
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true,
    },

})

// here users is name of collection in mongodb
const userModel =mongoose.model("users",userSchema);

//This line exports the userModel so that it can be imported and used in other parts of your application. 
module.exports = userModel;