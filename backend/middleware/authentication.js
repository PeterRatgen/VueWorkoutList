const jwt = require('jsonwebtoken');

exports.authenticate_token = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userId) => {

        if (err) return res.sendStatus(403)

        req.userId = userId

        next()
    })
}

exports.generate_token = function generateToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET_KEY, {expiresIn: '90d'});
}
