const uglifyjs = require('uglify-js');
const transform = require('gulp-insert').transform;

const acceptableExts = ['js', 'coffee', 'es6'];
const fileAcceptable = (file) => {
  const pathParts = file.path.split('.');
  const ext = pathParts[pathParts.length - 1];
  for (var i = 0; i < acceptableExts.length; i++) {
    if (ext == acceptableExts[i]) {
      return true;
    }
  }
  return false;
}

const appendedFunc = ((SIZE_VAR) => {
  return function() {
    if (typeof window._onFileLoadedOfSize === "function") {
      window._onFileLoadedOfSize(SIZE_VAR);
    }
  }
})(undefined).toString();

const generateFunction = (size) => {
  const functionString = "(" + appendedFunc.replace("SIZE_VAR", size) + ")()";
  const minFunction =  uglifyjs.minify(functionString, {fromString: true});
  return "\n" + minFunction.code;
}

const transformer = () => {
  return transform((contents, file) => {
    if (!fileAcceptable(file)) {
      return contents;
    }
    return contents + generateFunction(contents.length);
  })
}

module.exports = transformer;
