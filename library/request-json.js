var request = require('request')


function requestJson(url, callback) {
    request(url, function(b, a) {
        if (b) {
            callback(b)
        }
        else {
            try {
                var parsedResponse = JSON.parse(a)
                callback(null, parsedResponse)
            }
            catch(err) {
                callback(err)
            }
        }
    })
}








module.exports = requestJson