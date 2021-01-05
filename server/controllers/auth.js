const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config/index')


exports.generateTokens = (req, user) => { 
    const ACCESS_TOKEN = jwt.sign({ 
            sub: user._id, 
            type: 'ACCESS_TOKEN' 
        }, 
        TOKEN_SECRET, { 
            expiresIn: 3600000
        }); 
    const REFRESH_TOKEN = jwt.sign({ 
            sub: user._id, 
            type: 'REFRESH_TOKEN' 
        }, 
        TOKEN_SECRET, { 
            expiresIn: 3600000 
        }); 
    return { 
        accessToken: ACCESS_TOKEN, 
        refreshToken: REFRESH_TOKEN 
    } 
} 

exports.accessTokenVerify = (req, res, next) => {
    if (!req.headers.token) { 
        return res.status(401).send(
            'Nieautoryzowany dostęp' 
        ); 
    } 

    const token = req.headers.token;
    jwt.verify(token, TOKEN_SECRET, function(err) { 
        if (err) { 
            return res.status(401).send(
                "Błędne dane autoryzacji"
            ); 
        } 
        next(); 
    }); 
}