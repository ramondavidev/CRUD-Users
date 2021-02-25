const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).json({ msg: 'Acesso negado!'});
    }

    try {
        jwt.verify(token, 'd7weq5ewq', (error, decoded) => {
            if(error){
                console.log(error);
                return res.status(401).json({ msg: 'Token is not valid' });
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } catch (error) {
        console.error('something wrong with auth middleware');
        res.status(500).json({ msg: 'Server Error' });
    }
};