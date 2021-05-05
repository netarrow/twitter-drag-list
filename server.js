(function() {
    var Twitter = require('twitter-node-client').Twitter;
    var express = require('express');
    require('custom-env').env()

    var app = express();

    var port = process.env.PORT || 8080;

    var router = express.Router();

    var config = {
        "consumerKey": process.env.consumerKey,
        "consumerSecret": process.env.consumerSecret,
        "accessToken": process.env.accessToken,
        "accessTokenSecret": process.env.accessTokenSecret,
    }

    var twitter = new Twitter(config);

    router.get('/lists', function (req, res) {
        twitter.getCustomApiCall('/lists/list.json', { screen_name: process.env.screenName },
            function (error) {
                res.status(500).send(error);
            },
            function (data) {
                res.json(data);
            })
    });

    router.get('/addmember/:userId/tolist/:listId', function (req, res) {
        twitter.getCustomApiCall('/lists/members/create.json', { screen_name: process.env.screenName, 
            list_id: req.params['listid'], user_id: req.params['userId']},
            function (error) {
                res.status(500).send(error);
            },
            function (data) {
                res.json(data);
            })
    });

    router.get('/delmember/:userId/fromlist/:listId', function (req, res) {
        twitter.getCustomApiCall('lists/members/destroy.json', { screen_name: process.env.screenName, 
            list_id: req.params['listid'], user_id: req.params['userId']},
            function (error) {
                res.status(500).send(error);
            },
            function (data) {
                res.json(data);
            })
    });

    router.get('/members/:listid', function (req, res) {
        twitter.getCustomApiCall('/lists/members.json', { list_id: req.params['listid']},
            function (error) {
                res.status(500).send(error);
            },
            function (data) {
                res.json(data);
            })
    });

    router.get('/following', function (req, res) {
        twitter.getCustomApiCall('/friends/list.json', { screen_name: process.env.screenName, count: 200 },
            function (error) {
                res.status(500).send(error);
            },
            function (data) {
                res.json(data);
            })
    });

    // enable cors
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use('/api', router);

    app.listen(port);
    console.log('Magic happens on port ' + port);
})();