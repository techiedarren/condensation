var _ = require('lodash'),
loadTemplateHelper = require('./load-template-helper'),
sections = require('./template-helpers/sections');

module.exports = function(options) {

  var helpers = {
    assetS3Url: loadTemplateHelper(require('./template-helpers/assetS3Url'),options),
    helper: loadTemplateHelper(require('./template-helpers/helper'),options),
    layout: loadTemplateHelper(require('./template-helpers/layout'),options),
    partial: loadTemplateHelper(require('./template-helpers/partial'),options),
    set: loadTemplateHelper(require('./template-helpers/set'),options),
    requireAssets: loadTemplateHelper(require('./template-helpers/requireAssets'),options),
    templateS3Url: loadTemplateHelper(require('./template-helpers/templateS3Url'),options)
  };

  _.each(_.values(sections), function(v) {
    helpers[v.NAME] = loadTemplateHelper(v,options);
  });


  var engine = options.handlebars;
  _.each(_.pairs(helpers), function(kv) {
    if (!engine.helpers[kv[0]]) {
      engine.registerHelper(kv[0],kv[1]);
    }
  });

  return helpers;
};

