const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: 
		'./src/index.js'
	,
	output: {
		path: path.join(__dirname, './build'),
		filename: 'zoom-slideshow.js'
	}
}
