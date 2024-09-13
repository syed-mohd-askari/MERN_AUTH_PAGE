const ensureAuthenticated = require('../Middlewares/Auth');
const router = require('express').Router();
const userModel = require('../Models/user');


router.get('/',ensureAuthenticated,async (req,res)=>{

    const user = await userModel.findById(req.user._id);
    // console.log(user); //! To delete 
    
    //private data only visible to user who logged in
    res.status(200).json([
        // {
        //     id : user._id,
        //     name : user.name, 
        //     email : user.email,
        //     password : user.password
        // },
        {
            name : "mobile" ,
            prices : "45000"
        },
        {
            name : "tv" ,
            prices : "85000"
        }    
    ])
});

 
module.exports = router;
   