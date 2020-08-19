const router = require('express').Router()

'change-password see-profile check login signup new-token'.split(' ').forEach(action => {
    router.use(`/${action}`,require(`./${action}`))
})
router.get('/', (req, res) => res.send('Hello World!3'))

module.exports = router