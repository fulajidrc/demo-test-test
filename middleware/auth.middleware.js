
const jwt = require('jsonwebtoken');

const authMiddleware =  (req, res, next) => {
    try{
        if(req.cookies.loginToken){
            console.log(req.cookies);
            const decoded = jwt.verify(req.cookies.loginToken, process.env.JWT_KEY);
            console.log('decoded', decoded);
            if(decoded){
                req.user = decoded;
                next();
            }else{
                return res.status(401).send({
                    message: 'Unauthorize access!'
                });
            }
        }else{
            return res.status(401).send({
                message: 'Unauthorize access!'
            });
        }
    }catch(error){
        return res.status(401).json({
            message: 'Unauthorize access!'
        });
    }
}

module.exports = authMiddleware;