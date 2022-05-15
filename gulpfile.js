const gulp = require('gulp');
const sass = require('gulp-sass');
const sync = require('browser-sync');

const prefixer = require('gulp-autoprefixer');

/* Configs */

/* Tasks */
const sassTheme = () => (
    gulp
        .src('src/assets/sass/**/**.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefixer('Last 50 versions'))
        .pipe(gulp.dest('src/assets/css/'))
        .pipe(sync.stream())
);

const sassWatch = () => {
    gulp.watch('src/assets/sass/**/**.sass', sassTheme);
};

const browserSync = () => {
    sync.init({
        server: { baseDir: './src/' },
        ghostMode: false
    });
};

/* Tasks Declaration */
gulp.task('sass-theme', sassTheme);
gulp.task('sass-watch', sassWatch);
gulp.task('browser-sync', browserSync);
gulp.task('fdm', gulp.series('sass-theme', gulp.parallel('browser-sync', 'sass-watch')));
