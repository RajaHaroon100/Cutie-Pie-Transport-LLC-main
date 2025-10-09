const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY

const generateToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
 return new Promise((resolve, reject) => {
     jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
        reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

module.exports = { generateToken, verifyToken };

