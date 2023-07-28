
const jwt = require('jsonwebtoken');

const authMiddleware =  (req, res, next) => {
    try{
        const authHeader = req.headers["authorization"];
    
        if(authHeader){
            console.log('working');
            const decoded = jwt.verify(authHeader, process.env.JWT_KEY);
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
        console.log(error);
        return res.status(401).json({
            message: 'Unauthorize access!'
        });
    }
}

module.exports = authMiddleware;