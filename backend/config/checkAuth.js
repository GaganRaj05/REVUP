const jsonwebtoken = require('jsonwebtoken');

function checkAuth(req, res, next) {
    try {
        const token = req.cookies.jwt;
        if(!token ) return res.status(401).json("Login to use this feature");

        const result = jsonwebtoken.verify(token,process.env.JWT_SECRET);
        if(!result) return res.status(400).json("Login to use this feature");

        req.user_id = result.user_id;
        next();
    }
    catch(err) {
        console.log(err)
        return res.status(400).json("Login to use this feature");
    }
}
module.exports = checkAuth;
