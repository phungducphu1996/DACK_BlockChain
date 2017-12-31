var express = require('express');
var passport = require('passport');
var multer = require('multer');
var Product = require('../models/product');
var Category = require('../models/category');
var async = require('async'); 
const WebSocket = require('ws');



var Account = require('../models/account');
var router = express.Router();
var productController = require("../controllers/productController");
var homeController = require("../controllers/homeController");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage });


router.get('/', homeController.home_index);
router.get('/products/:id', homeController.home_detail_product);
router.get('/categorys/:id', homeController.home_category_list);
router.post('/search',upload.single("thumbnail"),homeController.home_search);

module.exports = router;

router.get('/user/signup', function(req, res) {


    res.render('userSignUp', {layout: 'layout',user : req.user,isRegister:true});
});

router.get('/test', function(req, res) {


const ws = new WebSocket('https://api.kcoin.club/blocks');

ws.onopen = function () {
    console.log('connected');
};

ws.onmessage = function (data) {
    console.log('incoming data', data)
};

    
    res.render('userSignUp', {layout: 'layout',user : req.user,isRegister:true});
});


router.get('/user/signup', function(req, res) {
    res.render('userSignUp', {layout: 'layout',user : req.user,isRegister:true});
});



router.get('/user/profile',authenticated,function(req, res) {
    res.render('userProfile', {layout: 'layout',user : req.user,isRegister:true});
});


router.post('/user/profile', upload.single("thumbnail"),function (req, res, next) {
    console.log(req.body);
    Account.find({_id:req.user._id}, function (err, products) {
        if (err){
            console.log(err);
            return;
        }
        products=products[0];
     products.username=req.body.username;
     products.name=req.body.name;
     products.address=req.body.address;
    products.age=req.body.age;
    products.mobile=req.body.mobile;

        products.save(function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
console.log(products);
          res.redirect('../user/profile');
    });
});


router.get('/dashboard',authenticated, function (req, res, next) {
    if(req.user.type=="admin")
    {
     res.render('dashboard', {layout: 'main_layout', user : req.user,title: 'Dashboard'});

    }
else
{
    res.redirect('/');
}

});


router.post('/user/signup',upload.single("thumbnail"),function (req, res, next) {
    var productArray=[] ;
    Product.find({}, function (err, products) {
        if (err){
            console.log(err);
            return;
        }
        var a;

async.each(products, function(product, callback) {
  findCategoryName(product.categoryID, function(result) {
 
        var productTemp=JSON.stringify(product);
        var productTemp='{"categoryName":"'+result+'",'+productTemp.replace("{",'');
        productArray.push(JSON.parse(productTemp));
      

    callback(null);
  });
}, function(err) { // this function gets called when the loop is done
  


 Category.find({}, function (err, category) {
        if (err){
            console.log(err);
            return;
        }

Product.find().sort({view:-1}).exec(function (err, sortViewProducts) {
        if (err){
            console.log(err);
            return;
        }


Product.find().sort({$natural:-1}).exec(function (err, sortLastProducts) {
        if (err){
            console.log(err);
            return;
        }

         });


Product.find().sort({$natural:-1}).exec(function (err, sortLastProducts) {
        if (err){
            console.log(err);
            return;
        }
         

if (req.body.password!=req.body.repassword)
{
     res.render('userSignUp', {
            layout: 'layout',
            title: 'All Products',
            activeProduct: true,
            activeAllProducts: true,
            items: sortLastProducts,
            lastProduct: sortLastProducts[0],
            recomendedProduct: sortViewProducts,
            maxViewProduct:sortViewProducts[0],
            user : req.user,
            wrongPass: true,
            categorys:category,
            isRegister:false
          });
}






    Account.register(new Account({ username : req.body.username ,address : req.body.address,name : req.body.name,type : "user",mobile : req.body.mobile,age : req.body.age}), req.body.password, function(err, account) {
        if (err) {
          console.log(err);
    return res.render('userSignUp', {layout: 'layout',title: 'All Products',activeProduct: true,activeAllProducts: true,items: sortLastProducts,lastProduct: sortLastProducts[0],recomendedProduct: sortViewProducts, maxViewProduct:sortViewProducts[0],user : req.user,alert: "a",categorys: category,isRegister:false});
  
        }

        passport.authenticate('local')(req, res, function () {
              //res.render('dashboard', { layout: 'main_layout',user : req.user,isRegister:false });
             res.redirect('/');
        });
    });

          
 });
});
   });

});
 });
    });














router.get('/user/signin',upload.single("thumbnail"),function (req, res, next) {
    var productArray=[] ;
    Product.find({}, function (err, products) {
        if (err){
            console.log(err);
            return;
        }
        var a;

async.each(products, function(product, callback) {
  findCategoryName(product.categoryID, function(result) {
 
        var productTemp=JSON.stringify(product);
        var productTemp='{"categoryName":"'+result+'",'+productTemp.replace("{",'');
        productArray.push(JSON.parse(productTemp));
      

    callback(null);
  });
}, function(err) { // this function gets called when the loop is done
  


 Category.find({}, function (err, category) {
        if (err){
            console.log(err);
            return;
        }

Product.find().sort({view:-1}).exec(function (err, sortViewProducts) {
        if (err){
            console.log(err);
            return;
        }


Product.find().sort({$natural:-1}).exec(function (err, sortLastProducts) {
        if (err){
            console.log(err);
            return;
        }

         });


Product.find().sort({$natural:-1}).exec(function (err, sortLastProducts) {
        if (err){
            console.log(err);
            return;
        }
         



            res.render('userSignIn', {
            layout: 'layout',
            title: 'All Products',
            activeProduct: true,
            activeAllProducts: true,
            items: sortLastProducts,
            lastProduct: sortLastProducts[0],
            recomendedProduct: sortViewProducts,
            maxViewProduct:sortViewProducts[0],
            user : req.user,
            categorys:category,
            isRegister:false
 });
});
   });

});
 });
    });
});


router.post('/user/signin',upload.single("thumbnail"), passport.authenticate('local', { failureRedirect: '../user/signin', failureFlash: false }),function (req, res, next) {
    var productArray=[] ;
    Product.find({}, function (err, products) {
        if (err){
            console.log(err);
            return;
        }
        var a;

async.each(products, function(product, callback) {
  findCategoryName(product.categoryID, function(result) {
 
        var productTemp=JSON.stringify(product);
        var productTemp='{"categoryName":"'+result+'",'+productTemp.replace("{",'');
        productArray.push(JSON.parse(productTemp));
      

    callback(null);
  });
}, function(err) { // this function gets called when the loop is done
  


 Category.find({}, function (err, category) {
        if (err){
            console.log(err);
            return;
        }

Product.find().sort({view:-1}).exec(function (err, sortViewProducts) {
        if (err){
            console.log(err);
            return;
        }


Product.find().sort({$natural:-1}).exec(function (err, sortLastProducts) {
        if (err){
            console.log(err);
            return;
        }

         });


Product.find().sort({$natural:-1}).exec(function (err, sortLastProducts) {
        if (err){
            console.log(err);
            return;
        }
         



        res.redirect('/');
});
   });

});
 });
    });
});






router.get('/user/signout', function(req, res) {
    req.logout();
    res.redirect('/');
});




module.exports = router;


function authenticated(req, res, next) {
 

 if (req.isAuthenticated())
 return next();
 

 res.redirect('../user/signin');
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
