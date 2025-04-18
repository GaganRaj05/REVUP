const jsonwebtoken = require('jsonwebtoken');
function checkLogin(req,res,next) {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            console.log("some isue")
            next();
            return;
        }
        const result = jsonwebtoken.verify(token,process.env.JWT_SECRET);
        console.log(result)
        if(token) return res.status(401).json("Already Logged in");
        next();
    }
    catch(err) {
        console.log(err);
        if(err.message === "jwt expired" || err.message === "jwt must be provided") {
            next();
        }else{
            return res.status(501).json(" Some error occured please try again later");

        }
    }
}
module.exports= checkLogin;