const express   = require('express')
const router    = express.Router()
const UserController      = require('../controllers/UserController')
const upload              = require('../middleware/upload')
const authenticate        =require('../middleware/authenticate')

router.get('/index',UserController.index)
router.get('/show/:userId',UserController.show)
router.post('/add',upload.array('Image[]'),UserController.Add)
router.put('/update',UserController.update)
router.delete('/delete',UserController.destroy)
router.put('/updateUser',UserController.updateUser)
router.get('/search',UserController.search)

module.exports = router












