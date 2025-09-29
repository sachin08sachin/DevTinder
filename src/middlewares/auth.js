const adminAuth = (req, res, next) => {
    console.log("admin auth middleware called");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized) {
        return res.status(401).send("Admin not authorized");
    }else {
        next();
    }

}
const userAuth = (req, res, next) => {
    console.log("user auth middleware called");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized) {
        return res.status(401).send("Admin not authorized");
    }else {
        next();
    }

}


module.exports = {
    adminAuth,
    userAuth,
}