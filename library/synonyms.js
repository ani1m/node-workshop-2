
var request = require('request');

function SynonymAPI (key) {
    this.key = key
};

SynonymAPI.prototype.getSynonyms = function (word, ocallback) {
    request("http://words.bighugelabs.com/api/2/" + this.key + "/" + word + "/json", function (err, res){
        if(err) {
            ocallback(err) 
            } else {
                try {
                    var parsedResponse = JSON.parse(res.body)
                    ocallback(null, parsedResponse)
                }
                catch(err) {
                    ocallback(err)
            }
        }
    })
}

module.exports = SynonymAPI