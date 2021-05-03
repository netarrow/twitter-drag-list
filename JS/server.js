(function() {
    var Twitter = require('twitter-js-client').Twitter;
    var express = require('express');

    var app = express();

    var port = process.env.PORT || 8080;

    var router = express.Router();

    var config = {
        "consumerKey": "",
        "consumerSecret": "",
        "accessToken": "",
        "accessTokenSecret": "",
    }

    var twitter = new Twitter(config);

    router.get('/lists', function (req, res) {
        twitter.getCustomApiCall('/lists/list.json', { screen_name: '' },
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
        twitter.getCustomApiCall('/friends/list.json', { screen_name: '', count: 200 },
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