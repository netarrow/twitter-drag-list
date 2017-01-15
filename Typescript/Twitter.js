/**
 * Created by netarrow on 15/01/17.
 */
"use strict";
var TwitterApi;
(function (TwitterApi) {
    var Twitter = require("twitter-js-client").Twitter;
    var config = {
        "consumerKey": "T2MpIQwPtNPmJEKmiBr4VWgnq",
        "consumerSecret": "Y1KbQFYrpPWv5r7ewy9o9WruaXM2KFgFK4pMiyf9npfbbkclnB",
        "accessToken": "96220584-Ylc763bXWYS8Gk1CTo1LUPwpjasTS8iZdNXXrO4oP",
        "accessTokenSecret": "A4XVuScITToOxurPT1UmlSTuOvYhY4t11NJIzlm1dquEh",
    };
    var twitterWrapper = new Twitter(config);
    var Data;
    (function (Data) {
        var List = (function () {
            function List(listJson) {
                this.id = listJson.id;
                this.name = listJson.name;
            }
            return List;
        }());
        Data.List = List;
        var ListRepository = (function () {
            function ListRepository() {
            }
            ListRepository.prototype.GetLists = function (onGetList) {
                twitterWrapper.getCustomApiCall('/lists/list.json', { screen_name: 'netarrow89' }, function (error) {
                    throw new Error(error);
                }, function (json) {
                    var data = JSON.parse(json);
                    if (data.statusCode == 429)
                        throw new Error("rate limit exceeded");
                    var lists = [];
                    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                        var item = data_1[_i];
                        lists.push(new List(item));
                    }
                    onGetList(lists);
                });
            };
            return ListRepository;
        }());
        Data.ListRepository = ListRepository;
    })(Data = TwitterApi.Data || (TwitterApi.Data = {}));
})(TwitterApi = exports.TwitterApi || (exports.TwitterApi = {}));
