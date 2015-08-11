# gulp-walc

> Removes `console` or `alert` functions in your scripts.

## Install

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-walc`

## Usage

```javascript
var walc = require('gulp-walc');

gulp.task('clean', function() {
  return gulp.src('app/*.js')
    .pipe(walc())
    .pipe(gulp.dest('dist'));
});
```

## Options

- `console`
  Pass `ignore` or `comment`, default is `remove`

- `alert`
  Idem `console`

## Notes

If no option object is passed, `remove` action will be executed