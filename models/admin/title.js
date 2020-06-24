const mongoose = require('mongoose');

var titleSchema = new mongoose.Schema({
    name: String
})

var TitleModel = mongoose.model('title', titleSchema);

module.exports = {
    TitleModel: TitleModel,

    findAllTitle: function () {
        return TitleModel.find();
    },
    saveTitle: function (title) {
        return title.save();
    },
    findTitleById: function (id) {
        return TitleModel.findById(id);
    },
    updateTitleById: function (id, value, options) {
        return TitleModel.findByIdAndUpdate(id, value, options);
    },
    deleteTitleById: function (id) {
        return TitleModel.deleteOne(id);
    }

}