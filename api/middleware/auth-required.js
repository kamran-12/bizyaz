module.exports = async (req, res, next) => {
    if (req.userId) {
        next();
    } else {
        req.status(401).send('Not authenticated, account is required.')
    }
}