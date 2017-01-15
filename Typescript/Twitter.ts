/**
 * Created by netarrow on 15/01/17.
 */

export module TwitterApi {
    var Twitter = require("twitter-js-client").Twitter;
    var config = {
        "consumerKey": "T2MpIQwPtNPmJEKmiBr4VWgnq",
        "consumerSecret": "Y1KbQFYrpPWv5r7ewy9o9WruaXM2KFgFK4pMiyf9npfbbkclnB",
        "accessToken": "96220584-Ylc763bXWYS8Gk1CTo1LUPwpjasTS8iZdNXXrO4oP",
        "accessTokenSecret": "A4XVuScITToOxurPT1UmlSTuOvYhY4t11NJIzlm1dquEh",
    }

    var twitterWrapper = new Twitter(config);

    export namespace Data {

        export class List {
            id: number;
            name: string;

            constructor(listJson: any) {

                this.id = listJson.id;
                this.name = listJson.name;
            }

        }

        export class ListRepository {

            public GetLists(onGetList: (lists: List[]) => void) {

                twitterWrapper.getCustomApiCall('/lists/list.json', {screen_name: 'netarrow89'},
                    error =>{
                        throw new Error(error);
                    },
                    json =>{

                    var data = JSON.parse(json);

                    if(data.statusCode == 429)
                        throw new Error("rate limit exceeded");

                        var lists: List[] = [];

                        for(var item of data) {
                            lists.push(new List(item));
                        }

                        onGetList(lists);
                    });

            }
        }
    }
}