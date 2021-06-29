const jwt = require('jsonwebtoken');

exports.authenticate_token = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)
    console.log("using authentication middleware")

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userId) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.userId = userId

        next()
    })
}

exports.generate_token = function generateToken(username) {
    let data = {
        userId: username
    }
  
    return jwt.sign(data, process.env.JWT_SECRET_KEY, {expiresIn: '90d'});
}
