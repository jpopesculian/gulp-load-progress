# Gulp Load Progress

A very simple gulp plugin that allows you to handle the loading of javascript
files to determine page load progress in complex fragmented front end architectures. 

## How to Use

Two sides need to be implemented. The gulp plugin, which injects a small
function into the bottom of each javascript page and a client side function which handles
that function call.

### Gulp Plugin

```(javascript)
const gulp = require('gulp');
const loadProgress = require('gulp-load-progress');

gulp.task('javascript', function() {
  return gulp.src('src')
    .pipe(loadProgress())
    .pipe(gulp.dest('dest'))
});
```

### Client (in your index.html for example)

The gulp function calls a `window._onFileLoadedOfSize(int: fileSize)` so you
just have to implement said function however you want. An example is below.

```(javascript)
const totalSize = 134934; // run once in production environment to determine size

window._onFileLoadedOfSize = (size) => {
  console.log(`Percent Loaded: ${size*100.0/totalSize}%`);
}
```
