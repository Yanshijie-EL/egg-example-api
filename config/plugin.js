'use strict';

// had enabled by egg

exports.static = true;

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.swaggerdoc = {
  enable: true,
  package: 'egg-swagger-doc',
};
