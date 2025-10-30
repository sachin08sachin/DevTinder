const jwt = require("jsonwebtoken");
const User = require('../models/user');

const userAuth = async (req, res, next) => {
 try{
    const {token} = req.cookies;
    // console.log("Cookies in auth middleware: ", req.cookies);
    // console.log("Token from cookies: ", token);
    if(!token){
        return res.status(400).send("Token is not valid!!!!!!!!")
    }
 const decodedObj = jwt.verify(token, "devTinderSecretKey");
 const {_id} = decodedObj;
 const user = await User.findById(_id);
 req.user = user;
 if(!user){
    return res.status(401).send("User not authorized");
 }
 next();
 }
 catch(err){
    return res.status(400).send("ERROR FROM MIDDLEWARE :"+ err.message);
}
}

module.exports = {
    userAuth,
}


// const adminAuth = (req, res, next) => {
//     console.log("admin auth middleware called");
//     const token = "xyz";
//     const isAdminAuthorized = token === "xyz";
//     if(!isAdminAuthorized) {
//         return res.status(401).send("Admin not authorized");
//     }else {
//         next();
//     }

// }
// const userAuth = (req, res, next) => {
//     console.log("user auth middleware called");
//     const token = "xyz";
//     const isAdminAuthorized = token === "xyz";
//     if(!isAdminAuthorized) {
//         return res.status(401).send("Admin not authorized");
//     }else {
//         next();
//     }

// }


// module.exports = {
//     adminAuth,
//     userAuth,
// }