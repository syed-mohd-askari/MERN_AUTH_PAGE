const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req,res,next) =>{
    const auth = req.headers['authorization'];

    // if authorization header doesnt exist then we will not proceed with any furthur requests
    if(!auth){
        return res.status(403).json({message : "Unauthorized, JWT token is required !"});
    }
    try { 

        // matching jwt token and checking its expiry
        const decoded = jwt.verify(auth , process.env.JWT_SECRET);

        //if it exist so now subsequent api's can directly access {email,name,headers etc} without need to make db request
        req.user = decoded
        next();
    }
    catch (err){
        return res.status(403).json({message : "Unauthorized, JWT token wrong or expired !"});
    }
}

module.exports = ensureAuthenticated;