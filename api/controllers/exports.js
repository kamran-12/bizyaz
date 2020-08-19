const router = require('express').Router()

'comments follows posts account reactions communities admin'.split(' ').forEach(section => {
    router.use(`/${section}`,require(`./${section}/exports`))
})
router.get('/', (req, res) => res.send('<h1 style="font-size: 100px; font-family: sans-serif;">THIS IS THE BAsssCKEND!</h1>'))

module.exports = router