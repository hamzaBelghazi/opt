const Page = require('../models/pageModel');
const factory = require('./handlerFactory');

exports.addPage = factory.createOne(Page);
exports.deletePage = factory.deleteOne(Page);
exports.updatePage = factory.updateOne(Page);
