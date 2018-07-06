'use strict';

var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');//压缩js
var minifycss = require('gulp-minify-css');//压缩css
var concat = require('gulp-concat');//合并文件
var rename = require('gulp-rename');//重命名文件
var clean = require('gulp-clean');//清空文件夹
var notify=require('gulp-notify');//提示
var pump = require('pump');

gulp.task('default',function(){
	gulp.start('minifyjs');
});

////css处理
//gulp.task('minifycss',function(){
//	return gulp.src('css/*.css')//设置css路径
//		//.pipe(rename({suffix:'.min'}))//修改文件名
//		.pipe(uglify())//压缩
//		.pipe(gulp.dest('dist/css'))
//		.pipe(notify({message:'css task ok'}));   //提示成功
//})
		
//JS处理
gulp.task('minifyjs',function(){
   return gulp.src('js/*.js')  //选择合并的JS
       .pipe(gulp.dest('dist/js'))
       //.pipe(rename({suffix:'.min'}))     //重命名
       .pipe(uglify())                    //压缩
       .pipe(gulp.dest('dist/js'))            //输出 
       .pipe(notify({message:"js task ok"}));    //提示
});


//gulp.task('script', function(cb) {
//  pump([
//          gulp.src('js/*.js'),
//          uglify(),
//          gulp.dest('dist/js')
//      ],
//      cb
//  );
//});
//
gulp.task('css', function(cb) {
    pump([
            gulp.src('css/index.css'),
            uglify(),
            gulp.dest('dist/css')
        ],
        cb
    );
});
//
//gulp.task('auto', function () {
//  // 监听文件修改，当文件被修改则执行 script 任务
//  gulp.watch('js/*.js', ['script'])
//})
//
//gulp.task('default', ['script', 'auto']);