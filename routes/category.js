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
var categoryController = require("../controllers/categoryController");


var itemRouter = express.Router({mergeParams: true});
router.use('/item', itemRouter);

router.get('/', authenticated,categoryController.category_list);
router.get('/:id/remove', categoryController.category_delete);

itemRouter.get('/:id',upload.single("thumbnail"),categoryController.category_edit);
itemRouter.get('/:price',upload.single("thumbnail"),categoryController.category_edit);
itemRouter.post('/:id',upload.single("thumbnail"),categoryController.category_edit_save);

router.get('/new', function(req, res, next) {
    console.log('This is message from id products/new');
  
    res.render('addCategory', {layout: 'main_layout', title: 'Add New Category', activeCategory: true, activeAddProduct: false,user : req.user,isRegister:false});

});

router.post('/new',upload.single("thumbnail"),categoryController.category_insert);



module.exports = router;
function authenticated(req, res, next) {
 

 if (req.isAuthenticated())
 return next();
 

 res.redirect('../user/signin');
}