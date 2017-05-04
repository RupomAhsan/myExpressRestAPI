var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser=require('body-parser'),
    chalk = require('chalk');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./models/bookModel');
bookRouter=require('./Routes/bookRoutes')(Book);

var Author = require('./models/authorModel');
authorRouter=require('./Routes/authorRoutes')(Author);



app.use('/api/books', bookRouter);
app.use('/api/authors', authorRouter);

app.get('/', function (req, res) {
    res.send('Welcome to my API');
});

app.listen(port, function () {
    console.log(chalk.blue('Gulp is running my app on PORT : ' + port));
});