const Announce = require('../models/announceModel');
const factory = require('./handlerFactory');

exports.addAnnouncement = factory.createOne(Announce);
exports.deleteAnnouncement = factory.deleteOne(Announce);
exports.updateAnnouncement = factory.updateOne(Announce);
