/**
 * Created by Day on 10/05/2017.
 */
var Wallet = require('../models/wallet');
var Category = require('../models/category');
        var merge = require('underscore'); // npm install underscore to install
var async = require('async'); 
exports.wallet_insert = function (req, res, next) {
    console.log("-----");
    console.log(req.file);
  
    console.log("-----");
    // model
    if(!isNaN(req.body.item_price))
    {
        console.log(req.body);
    var wallet_instance = new Wallet({
        name: req.body.item_name,
        price: req.body.item_price,
        reducePrice: req.body.item_reducePrice,
        categoryID: req.body.item_category,
        statusID: req.body.item_status,
        des: req.body.item_des,
        view: "0",
        thumbnail: req.file.filename
        
    });
    // Save the new model instance, passing a callback
    wallet_instance.save(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        // saved!
        //pass data to view
        res.render('item', {
            layout: 'main_layout',
            title: 'Add new wallet address',
            activeWallet: true,
            activeAddWallet: true,
            user : req.user,
            isRegister:false
        });
    });

    }
    else
    {

        Category.find({}, function (err, category) {
        if (err){
            console.log(err);
            return;
        }

res.render('item', {layout: 'main_layout', title: 'Add New Wallets', activeWallet: true,categorys:category, activeAddWallet: false,user : req.user,isRegister:false});
    });

        
    }
};


exports.wallet_list_delete = function (req, res, next) {
    Wallet.find({}, function (err, wallets) {
        if (err){
            console.log(err);
            return;
        }

        res.render('wallets', {
            layout: 'main_layout',
            title: 'Delete Wallets',
            activeWallet: true,
            
            items: wallets,
            user : req.user,
            deleteWallet: true,
            isRegister:false
        });
    });
};

exports.wallet_edit_save = function (req, res, next) {
    console.log(req.body);
    Wallet.find({_id:req.params.id}, function (err, wallets) {
        if (err){
            console.log(err);
            return;
        }
        wallets=wallets[0];
        wallets.name= req.body.item_name;
        wallets.price=req.body.item_price;
        wallets.categoryID=req.body.item_category;
        wallets.reducePrice=req.body.item_reducePrice;
        wallets.statusID= req.body.item_status;
        wallets.des= req.body.item_des;
        wallets.thumbnail= req.file.filename;

        wallets.save(function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });

          res.render('item', {layout: 'main_layout', title: wallets.title, isEdit: true, activeWallet: true, error: 'Error', item: wallets,user : req.user,isRegister:false});
    });
};



exports.wallet_delete = function (req, res, next) {
    console.log(req.params.id);
    Wallet.remove({_id:req.params.id}, function (err, wallets) {
        if (err){
            console.log(err);
            return;
        }
     
          
    });

res.redirect('back');
};


exports.wallet_edit = function (req, res, next) {
  
    Wallet.find({_id:req.params.id}, function (err, wallets) {
        if (err){
            console.log(err);
            return;
        }

        wallets=wallets[0];
 console.log(wallets);



    Category.find({}, function (err, category) {
        if (err){
            console.log(err);
            return;
        }
  res.render('editWallet', {layout: 'main_layout', title: wallets.title, isEdit: true, activeWallet: true,categorys:category, error: 'Error', item: wallets,user : req.user,isRegister:false});

    });



        
    });
};



exports.wallet_list = function (req, res, next) {
    var walletArray=[] ;
    Wallet.find({}, function (err, wallets) {
        if (err){
            console.log(err);
            return;
        }
        var a;

async.each(wallets, function(wallet, callback) {
  findCategoryName(wallet.categoryID, function(result) {
 
        var walletTemp=JSON.stringify(wallet);
        var walletTemp='{"categoryName":"'+result+'",'+walletTemp.replace("{",'');
        walletArray.push(JSON.parse(walletTemp));
      

    callback(null);
  });
}, function(err) { // this function gets called when the loop is done
  



 console.log(walletArray);


         res.render('wallets', {
            layout: 'main_layout',
            title: 'All Wallets',
            activeWallet: true,
            activeAllWallets: true,
            items: walletArray,
            user : req.user,
            isRegister:false

});




  

          
        });
    });
};

exports.wallet_add = function (req, res, next) {
    Category.find({}, function (err, category) {
        if (err){
            console.log(err);
            return;
        }

res.render('item', {layout: 'main_layout', title: 'Add New Wallets', activeWallet: true,categorys:category, activeAddWallet: false,user : req.user,isRegister:false});
    });
};







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


