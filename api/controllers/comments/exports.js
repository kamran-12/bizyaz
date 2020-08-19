const router = require('express').Router()

'add delete edit see'.split(' ').forEach(action => {
    router.use(`/${action}`,require(`./${action}`))
})

module.exports = router