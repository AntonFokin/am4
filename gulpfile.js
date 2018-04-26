var gulp     = require("gulp"),
	scss     = require("gulp-sass"),
	minify   = require("gulp-cssmin"),
	rename   = require("gulp-rename"),
	concat   = require("gulp-concat"),
	uglify   = require("gulp-uglify"),
	del      = require("del"),
	imagemin = require("gulp-imagemin");

gulp.task("scss", function(){
	return gulp.src("app/styles/scss/main.scss")
			   .pipe(scss().on('error', scss.logError))
			   .pipe(minify())
			   .pipe(rename({suffix: '.min'}))
			   .pipe(gulp.dest("app/styles/css/"));
});

gulp.task("script", function(){
	return gulp.src(["app/libs/jquery/dist/jquery.min.js", "app/libs/slick-carousel/slick/slick.min.js"])
			   .pipe(concat("libs.min.js"))
			   .pipe(uglify())
			   .pipe(gulp.dest("app/js"));
});
gulp.task("img", function(){
	return gulp.src("app/images/**/*")
			   .pipe(imagemin({
					interlaced: true,
					progressive: true,
					optimizationLevel: 5,
					svgoPlugins: [{removeViewBox: true}]
				}))
			   .pipe(gulp.dest("dist/images"));
});

gulp.task("clean", function(){
	return del.sync(["dist/**", "!dist"]);
});

gulp.task("watch", ["scss", "scripts"], function(){
	gulp.watch("app/styles/scss/main.scss", ["scss"]);
});

gulp.task("build", ["clean", "img"], function(){
	var buildHtml  = gulp.src("app/*.html")
					   .pipe(gulp.dest("app/dist"));
	var buildCss   = gulp.src("app/styles/css/**/*")
					   .pipe(gulp.dest("app/dist/css"));
	var buildjs    = gulp.src(["app/js/**/*"])
					   .pipe(gulp.dest("app/dist/js"));
	var buildFonts = gulp.src("app/fonts/**/*")
					   .pipe(gulp.dest("app/dist/fonts"));
});