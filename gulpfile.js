var gulp = require('gulp'),
    chalk=require('chalk'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        ext:'js',
        env:{
            PORT:8000
        },
        ignore:['./node_module/**']
    })
    .on('restart',function(){
        console.log(chalk.cyan('Restarting gulp...'));
    });
});