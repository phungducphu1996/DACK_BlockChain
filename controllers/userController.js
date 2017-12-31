/**
 * Created by Day on 10/05/2017.
 */
var Category = require('../models/category');
var Account = require('../models/account');


exports.user_insert = function (req, res, next) {
    console.log("-----");
    console.log(req.body);
    console.log("-----");
    // model
            console.log(req.body.category_name);
    var category_instance = new Category ({
        name: req.body.category_name

});
    // Save the new model instance, passing a callback
    category_instance.save(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        // saved!
        //pass data to view
        res.render('addCategory', {
            layout: 'main_layout',
            title: 'Add New Category',
            activeCategory: true,
            activeAddProduct: true,
            user : req.user,
            isRegister:false
        });
    });
};


exports.user_list_delete = function (req, res, next) {
    Account.find({}, function (err, products) {
        if (err){
            console.log(err);
            return;
        }

        res.render('products', {
            layout: 'main_layout',
            title: 'Delete Products',
            activeCategory: true,
            
            items: products,
            user : req.user,
            deleteProduct: true,
            isRegister:false
        });
    });
};

exports.user_edit_save = function (req, res, next) {
    console.log(req.body);
    Account.find({_id:req.params.id}, function (err, products) {
        if (err){
            console.log(err);
            return;
        }
        products=products[0];
     products.username=req.body.item_username;
     products.name=req.body.item_name;
     products.address=req.body.item_address;
    products.age=req.body.item_age;
    products.mobile=req.body.item_mobile;
    products.type=req.body.item_type;
        products.save(function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
console.log(products);
          res.render('userEdit', {layout: 'main_layout', title: products.title, activeEditProduct: true, activeCategory: true, error: 'Error', item: products,user : req.user,isRegister:false});
    });
};



exports.user_delete = function (req, res, next) {
    console.log(req.params.id);
    Account.remove({_id:req.params.id}, function (err, products) {
        if (err){
            console.log(err);
            return;
        }
     
          
    });

res.redirect('back');
};


exports.user_edit = function (req, res, next) {
    console.log(req.params.id);
    Account.find({_id:req.params.id}, function (err, products) {
        if (err){
            console.log(err);
            return;
        }
        products=products[0];
          res.render('userEdit', {layout: 'main_layout', title: products.title, isEdit: true, activeCategory: true, error: 'Error', item: products,user : req.user,isRegister:false});
    });
};



exports.user_list = function (req, res, next) {
    Account.find({}, function (err, products) {
        if (err){
            console.log(err);
            return;
        }

        res.render('userManager', {
            layout: 'main_layout',
            title: 'All Users',
            activeUser: true,
            activeAllProducts: true,
            items: products,
            user : req.user,
            isRegister:false
        });
    });
};






