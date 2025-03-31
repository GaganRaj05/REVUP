function checkLogin(req,res,next) {
    try {
        const token = req.cookies.jwt;
        if(token) return res.status(401).json("Already Logged in");
        next();
    }
    catch(err) {
        return res.status(501).json("Some error occured please try again later");
    }
}
module.exports= checkLogin;