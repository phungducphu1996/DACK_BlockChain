var express = require('express');
var passport = require('passport');
var multer = require('multer');

var Wallet = require('../models/product');
var Category = require('../models/category');
        var merge = require('underscore'); // npm install underscore to install
var async = require('async'); 




var Account = require('../models/account');
var router = express.Router();
var walletController = require("../controllers/walletController");
var homeController = require("../controllers/homeController");
var userController = require("../controllers/userController");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage });



router.get('/', userController.user_list);
router.get('/delete', userController.user_list_delete);
router.get('/:id/remove', userController.user_delete);

router.get('/:id',userController.user_edit);
router.post('/:id', upload.single("thumbnail"),userController.user_edit_save);


module.exports = router;


function authenticated(req, res, next) {
 

 if (req.isAuthenticated())
 return next();
 

 res.redirect('/signin');
}


function findCategoryName(categoryID,callback)
{

Category.find({_id:categoryID}, function (err, categorys) {
        if (err){
            console.log(err);
            return;
        }
        categorys=categorys[0];
         
   callback(categorys.name);

         });


}


