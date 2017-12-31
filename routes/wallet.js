/**
 * Created by ttson on 5/1/2017.
 */

var express = require('express');
var multer = require('multer');
var passport = require('passport');
var Account = require('../models/account');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage });
var router = express.Router();
var walletController = require("../controllers/walletController");

var itemRouter = express.Router({mergeParams: true});
router.use('/item', itemRouter);

router.get('/', walletController.wallet_list);
router.get('/delete', walletController.wallet_list_delete);
router.get('/:id/remove', walletController.wallet_delete);

itemRouter.get('/:id',walletController.wallet_edit);
itemRouter.post('/:id', upload.single("thumbnail"),walletController.wallet_edit_save);

router.get('/new', walletController.wallet_add);

router.post('/new', upload.single("thumbnail"),walletController.wallet_insert);



module.exports = router;
function authenticated(req, res, next) {
 

 if (req.isAuthenticated())
 return next();
 

 res.redirect('../user/signin');
}