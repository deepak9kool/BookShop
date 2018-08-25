var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//API's

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');

var db = mongoose.connection;
db.on('error',console.error.bind(console, '# MongoDB - conn ection error'));

//SET UP SESSION
app.use(session({
  secret:'mySecretString',
  saveUninitialized:false,
  resave: false,
  cookie:{maxAge:1000 * 60 * 60 * 24 * 2},
  store: new MongoStore({mongooseConnection: db,ttl:2*24*60*60*1000})
  //ttl:2 days 24 hours 60 minute 60 seconds
}))

  //SAVE SESSION CART API
  app.post('/cart',function(req,res){
    var cart = req.body;
    req.session.cart = cart;
    req.session.save(function(err){
      if (err) throw err;
      res.json(req.session.cart)
    })
  })
  //GET SESSION CART API
  app.get('/cart',function(req,res){
    if(typeof req.session.cart !== undefined){
      res.json(req.session.cart);
    }
  })

//END SESSION SET UP
var Books = require('./models/books');

//----->>POST BOOKS<<---------
app.post('/books',function(req,res){
  var book = req.body;

  Books.create(book,function(err,books){
    if(err) throw err;
    res.json(books);
  }) 

});

//------>GET BOOKS<--------
app.get('/books',function(req,res){
  Books.find(function(err,books){
    if (err) throw err;
    res.json(books);
  })
})

//------>DELETE<--------
app.delete('/books/:_id',function(req,res){
  var query = {_id : req.params._id};
  Books.remove(query,function(err,books){
    if (err) {console.log('# API DELETE BOOKS',err)};
    res.json(books);
  })
})

//------>UPDATE<--------
app.put('/books/:_id',function(req,res){
  var books = req.body;
  var query = req.params._id;
  //if the field doesnt exist $set will set a new field
  var update={
    '$set':{
      title:books.title,
      description:books.description,
      images:books.images,
      price:books.price
    }
  }
  var options={ new: true}

  Books.findOneAndUpdate(query,update,options,function(err,books){
    if (err) throw err;
    res.json(books);
  })
})

//GET BOOKS IMAGES API
app.get('/images',function(req,res){
  const imgFolder = __dirname+'/public/images'
  //REQUIRE FILESYSTEM
  var fs = require('fs');
  fs.readdir(imgFolder,function(err,files){
    if (err){
      console.error(err);
    }
    const filesArr = [];
    files.forEach(function(file){
      filesArr.push({name:file})
    })
    //SEND THE JSON RESPONSE WITH ARRAY
    res.json(filesArr);
  })
})

//END API;s
app.listen(3003,function(err){
  if(err){
    return console.log(err);
  }
    console.log('API server is listenting on port http://localhost:3003/');
})
