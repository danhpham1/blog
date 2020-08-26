const postModel = require("../../models/admin/post");

function isEmpty(obj) {
    for (var x in obj) { return false; }
    return true;
}

module.exports.getAllPost = (req, res) => {
    if (isEmpty(req.query)) {
        postModel.getAllPosts()
            .then(data => {
                res.status(200).json(
                    { result: 1, data: data }
                )
            })
            .catch(err => {
                res.status(404).json(
                    { result: 0, msg: "Not Found" }
                )
            })
    } else {
        if (req.query.hasOwnProperty('size')) {
            postModel.getAllPosts(+req.query.size)
                .then(data => {
                    res.status(200).json(
                        { result: 1, data: data.reverse() }
                    )
                })
                .catch(err => {
                    res.status(404).json(
                        { result: 0, msg: "Not Found" }
                    )
                })
        }
        if (req.query.hasOwnProperty('title')) {
            if (req.query.hasOwnProperty('size')) {
                postModel.getPostTitle(req.query.title, +req.query.size)
                    .then(data => {
                        res.status(200).json(
                            { result: 1, data: data }
                        )
                    })
                    .catch(err => {
                        res.status(404).json(
                            { result: 0, msg: "Not Found" }
                        )
                    })
            } else {
                postModel.getPostTitle(req.query.title)
                    .then(data => {
                        console.log(req.query.title);
                        res.status(200).json(
                            { result: 1, data: data }
                        )
                    })
                    .catch(err => {
                        res.status(404).json(
                            { result: 0, msg: "Not Found" }
                        )
                    })
            }

        }
    }

}

module.exports.getPost = (req, res) => {
    if (req.params.id) {
        postModel.getPostById(req.params.id)
            .then(data => {
                res.status(200).json(
                    { result: 1, data: data }
                )
            })
            .catch(err => {
                res.status(404).json(
                    { result: 1, msg: "Not Found" }
                )
            })
    } else {
        res.status(404).json(
            { result: 0, msg: "Not Found" }
        )
    }
}


module.exports.getPopularPosts = (req, res) => {
    if (isEmpty(req.query)) {
        postModel.getPostViews()
            .then(data => {
                res.status(200).json({ result: 1, data: data })
            })
            .catch(err => {
                res.status(404).json({ result: 0, message: "cannot fetch popularposts" });
            })
    } else {
        res.json({ result: 1, message: "please delete query url" })
    }
}

module.exports.getLastPost = async (req, res) => {
    if (req.query.count) {
        // console.log(req.query.count);
        try {
            let postNew = await postModel.getPostNews(+req.query.count);
            res.json({ result: 1, data: postNew });
        } catch (error) {
            res.json({ result: 0, message: "fetch post news fail" });
        }

    } else {
        res.json({ result: 0, message: "Please query with count" })
    }
}

module.exports.getPostRandom = async (req, res) => {
    if (req.query.count) {
        try {
            let postRandom = await postModel.getPostRandom(+req.query.count);
            res.json({ result: 1, data: postRandom });
        } catch (error) {
            res.json({ result: 0, message: "fetch post random faild" });
        }
    } else {
        res.json({ result: 0, message: "Please query with count" });
    }
}