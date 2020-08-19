const router = require('express').Router()

'add delete see'.split(' ').forEach(action => {
    router.use(`/${action}`,require(`./${action}`))
})

module.exports = router