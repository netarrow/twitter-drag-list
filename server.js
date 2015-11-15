(function() {
    var Twitter = require('twitter-js-client').Twitter;
    var express = require('express');

    var app = express();

    var port = process.env.PORT || 8080;

    var router = express.Router();

    var config = {
        "consumerKey": "T2MpIQwPtNPmJEKmiBr4VWgnq",
        "consumerSecret": "Y1KbQFYrpPWv5r7ewy9o9WruaXM2KFgFK4pMiyf9npfbbkclnB",
        "accessToken": "96220584-Ylc763bXWYS8Gk1CTo1LUPwpjasTS8iZdNXXrO4oP",
        "accessTokenSecret": "A4XVuScITToOxurPT1UmlSTuOvYhY4t11NJIzlm1dquEh",
    }

    var twitter = new Twitter(config);

    router.get('/lists', function (req, res) {
        twitter.getCustomApiCall('/lists/list.json', {screen_name: 'netarrow89'},
            function (error) {
                res.json(error);
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