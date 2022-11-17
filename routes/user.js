const express   = require('express')
const router    = express.Router()
const UserController      = require('../controllers/UserController')
const upload              = require('../middleware/upload')
const authenticate        =require('../middleware/authenticate')

router.get('/',authenticate,UserController.index)
router.get('/show',UserController.show)
router.post('/add',upload.array('Image[]'),UserController.Add)
router.put('/update',UserController.update)
router.delete('/delete',UserController.destroy)

module.exports = router












