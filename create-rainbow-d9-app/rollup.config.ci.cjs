const {buildConfig} = require('./rollup.config.base.cjs');

exports.default = [buildConfig(false)];