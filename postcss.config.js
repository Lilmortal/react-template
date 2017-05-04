const autoPrefixer = require("autoprefixer");
const stylefmt = require("stylefmt");
const stylelint = require("stylelint");
const cssNext = require("postcss-cssnext");

module.exports = {
  // This allows me to write CSS rules without vendor prefixes. e.g. I can just type display: flex;
  // instead of display: -webkit-box; display: -ms-flexbox; display: flex; etc.
  autoPrefixer,

  // This auto formats CSS code
  stylefmt,

  // Linting for CSS
  stylelint,

  cssNext
};
