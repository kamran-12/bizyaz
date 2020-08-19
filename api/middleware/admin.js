const User = require('../models/user')

module.exports = async (req, res, next) => {
    if (req.userId) {
        let user = await User.findById(req.userId)
        if (user.admin == true) {
            next();
        } else {
            return res.status(401).send("You are not admin, you cannot do this.")
        }
    } else {
        req.status(401).send('Not authenticated, account is required.')
    }
}