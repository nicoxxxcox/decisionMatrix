const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();
const del = require('del');
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");

//====== What's the folder to watch and reload ?

// Where is your source files ?
const srcFolder = "src/";

// Where is your destination files ?
const distFolder = "dist/";

//======

//Compile, prefix and minifify scss
function scssTask() {
    return src(srcFolder + "scss/*.scss", { outputStyle: "compressed", sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(dest(distFolder + "css/", { sourcemaps: '.' }))
        .pipe(browserSync.stream());
}

// compile uglify and replace js
function jsTask() {
    return src(srcFolder + "js/*.js")
        //.pipe(uglify())
        .pipe(dest(distFolder + "js/"))
        .pipe(browserSync.stream());
}

// delete dist folder
function cleanDist(done) {
    del.sync('dist');
    return done();
}

// move html files
function htmlTask() {
    return src(srcFolder + "*.html").pipe(dest(distFolder));
}

// watch src files
function watchTask() {
    browserSync.init({
        server: {
            baseDir: distFolder,
        },
    });
    watch(
        [srcFolder + "scss/*.scss", srcFolder + "*.html", srcFolder + "js/*.js"], { ignoreInitial: false },
        series(parallel(htmlTask, scssTask, jsTask)) ,
    ).on("change", browserSync.reload);
}


exports.default = watchTask;
exports.clean = cleanDist;
