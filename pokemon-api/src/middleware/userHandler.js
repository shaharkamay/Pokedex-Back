const fs = require('fs');
const path = require('path');

module.exports.userHandler = (req, res, next) => {
    const username = req.headers.username;
    if(!username) {
        console.log("must enter a valid username")
    }
    const userPath = path.resolve(path.join("./src/static-files/users", username));
    console.log(userPath);
    if(!fs.existsSync(userPath)) fs.mkdirSync(userPath);
    req.username = username;
    next();
}