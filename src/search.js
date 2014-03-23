var https = require("https");
var KwikdeskError = require("./error");

var noop = function(){};

function Search(q) {
    /**
     * Search term
     *
     * @type {string}
     */
    this.q = q;
}

Search.prototype.execute = function (cb) {
    cb = cb || noop;

    var options = {
        method: "GET",
        host: "api.kwikdesk.com",
        path: "/search?q=" + encodeURIComponent(this.q)
    };

    var callback = function (response) {
        var buffer = [];
        response.on("data", function (chunk) {
            buffer.push(chunk);
        });

        response.on("end", function () {
            var obj = JSON.parse(buffer.join(""));
            if (obj.error === 0) {
                cb(null, obj.results);
            } else {
                cb(new KwikdeskError(obj.message, obj.error), obj);
            }
        });
    };

    var req = https.request(options, callback);
    req.on("error", cb);
    req.end();
};

module.exports = Search;
