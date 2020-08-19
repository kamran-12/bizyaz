const router = require('express').Router()

'remove-comment remove-post'.split(' ').forEach(action => {
    router.use(`/${action}`,require(`./${action}`))
})
router.get('/', (req, res) => res.send('Hello World!3'))

module.exports = router