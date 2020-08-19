const router = require('express').Router()

'add delete edit view'.split(' ').forEach(action => {
    router.use(`/${action}`,require(`./${action}`))
})
router.get('/', (req, res) => res.send('Hello World!3'))

module.exports = router