const jsonwebtoken = require('jsonwebtoken');
function checkLogin(req,res,next) {
    try {
        const token = req.cookies.jwt;
        const result = jsonwebtoken.verify(token,process.env.JWT_SECRET);
        console.log(result)
        if(token) return res.status(401).json("Already Logged in");
        next();
    }
    catch(err) {
        if(err.message === "jwt expired") {
            next();
        }else{
            return res.status(501).json(" Some error occured please try again later");

        }
    }
}
module.exports= checkLogin;