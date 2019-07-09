var express = require('express');
var router = express.Router();
var Category = require('../models/Category.js');
var Item = require('../models/Item.js');
var Option = require('../models/Option.js');
var Tax = require('../models/Tax.js');
var Modifier = require('../models/Modifier');
var Component = require('../models/Component');
var Type = require('../models/Type');
var Subtype = require('../models/Subtype');


const dbSelector = function(db){
  console.log('inside db selector', db, typeof(db))
  //later change this to always pass in lower case types
  db =  db.toLowerCase();
  switch (db) {
    case 'category' : return Category;
    case 'item'     : return Item;
    case 'option'   : return Option;
    case 'tax'      : return Tax;
    case 'modifier' : return Modifier;
    case 'component': return Component;
    case 'type'     : return Type;
    case 'subtype'  : return Subtype;
    default: new Error('cant find the DB dude -dbSelector');
  }
};

// get all
router.get('/all*', function(req, res, next) {
  let db = String(arguments['0'].url.match(/^\/all\w+/)).slice(4);
  console.log('getting all: ',db)
  let DB = dbSelector(db);
  DB.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

// get one by id 
router.get('/one*/:id', function(req, res, next) {
  let db = String(arguments['0'].url.match(/^\/one\w+/)).slice(4);
  console.log('getting one: ',db);
  let DB = dbSelector(db);
  DB.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// get one by name
router.get('/name*/:name', function(req ,res, next){
  let db = String(arguments['0'].url.match(/^\/name\w+/)).slice(5);
  console.log('getting by name', req.params.name); //req.params.name
  let DB = dbSelector(db);
  DB.findOne({name:req.params.name}, function (err, post){
    if (err) return next(err);
    console.log('potato potato potato',post)
    res.json(post);
  });
});

// save something
router.post('/p*', function(req, res, next) {
  let db = String(arguments['0'].url.match(/^\/p\w+/)).slice(2);
  console.log('posting to: ',db);
  let DB = dbSelector(db);
  DB.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// update something
router.put('/u*/:id', function(req, res, next) {
  let db = String(arguments['0'].url.match(/^\/u\w+/)).slice(2);
  console.log('Updating: ',db)
  let DB = dbSelector(db);
  DB.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// delete something
router.delete('/d*/:id', function(req, res, next) {
  let db = String(arguments['0'].url.match(/^\/d\w+/)).slice(2)
  console.log('deleting from: ',db)
  let DB = dbSelector(db);
  DB.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;