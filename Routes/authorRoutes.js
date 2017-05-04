var express =require('express');

var routes =function(Author){
    
var authorRouter = express.Router();
authorRouter.route('/')
.post(function(req,res){
    var author=new Author(req.body);
    // console.log(author);
    author.save();
    res.status(201).send(author);
})
    .get(function (req, res) {
        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Author.find(query, function (err, authors) {
            if (err)
                res.status(500).send(err); //  console.log(chalk.red(err));
            else
                res.json(authors);
        });
    });

authorRouter.route('/:authorId')
    .get(function (req, res) {
        Author.findById(req.params.authorId, function (err, authors) {
            if (err)
                res.status(500).send(err); //  console.log(chalk.red(err));
            else
                res.json(authors);
        });
    });
    return authorRouter;
};

module.exports=routes;