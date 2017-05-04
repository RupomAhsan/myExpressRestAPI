var express = require('express'),
    mongoose = require('mongoose'),
    chalk = require('chalk');

var app = express();

var port = process.env.PORT || 3000;

var db = mongoose.connect('mongodb://localhost/bookAPI');
var book = require('./models/bookModel');

var bookRouter = express.Router();
bookRouter.route('/books')
    .get(function (req, res) {
        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        book.find(query, function (err, books) {
            if (err)
                res.status(500).send(err); //  console.log(chalk.red(err));
            else
                res.json(books);
        });
    });

bookRouter.route('/books/:bookId')
    .get(function (req, res) {
        book.findById(req.params.bookId, function (err, books) {
            if (err)
                res.status(500).send(err); //  console.log(chalk.red(err));
            else
                res.json(books);
        });
    });

app.use('/api', bookRouter);

app.get('/', function (req, res) {
    res.send('Welcome to my API');
});

app.listen(port, function () {
    console.log(chalk.blue('Gulp is running my app on PORT : ' + port));
});