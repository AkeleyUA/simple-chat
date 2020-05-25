const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => {
  res.send('Server is up and runnigs')
})

module.exports = router