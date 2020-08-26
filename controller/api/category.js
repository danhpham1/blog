const titleModel = require("../../models/admin/title");

module.exports.getAllTitle = (req, res) => {
    titleModel.findAllTitle()
        .then(data => {
            res.status(200).json(
                { result: 1, data: data }
            )
        })
        .catch(err => {
            res.status(404).json(
                { result: 0, err: "Not Found" }
            )
        })

}