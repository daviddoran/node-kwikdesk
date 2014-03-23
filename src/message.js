var https = require("https");
var KwikdeskError = require("./error");

var noop = function(){};

//One day (24 hours) in minutes
var OneDay = 1440;

function Message(params) {
    /**
     * @type {string}
     */
    this.content = "";

    /**
     * Time-to-live (in minutes) before automatic deletion
     *
     * @type {int}
     */
    this.delete = OneDay;

    params = params || {};

    if (typeof params === "object") {
        this.content = params.content || "";
        this.delete = params.hasOwnProperty("delete") ? params.delete : null;
    } else {
        if (arguments.length > 0) {
            this.content = arguments[0];
        }
        if (arguments.length > 1) {
            this.delete = arguments[1];
        }
    }
}

Message.prototype.validate = function (cb) {
    cb = cb || noop;
    if (this.content.length === 0) {
        cb(new Error("The message content cannot be empty"));
        return;
    }
    if ((this.delete === null) || this.delete < 1) {
        cb(new Error("The message delete parameter must be greater than zero"));
        return;
    }
};

/**
 * Serialize a message object to send it to the API
 *
 * @param {Message} message
 */
function serialize(message) {
    return JSON.stringify(message);
}

Message.prototype.save = function (cb) {
    cb = cb || noop;

    this.validate(cb);

    var options = {
        method: "POST",
        host: "api.kwikdesk.com",
        path: "/messages",
        headers: {"Content-Type": "application/json"}
    };

    var callback = function (response) {
        var buffer = [];
        response.on("data", function (chunk) {
            buffer.push(chunk);
        });

        response.on("end", function () {
            var obj = JSON.parse(buffer.join(""));
            if (obj.error === 0) {
                cb(null, obj);
            } else {
                cb(new KwikdeskError(obj.message, obj.error), obj);
            }
        });
    };

    var req = https.request(options, callback);
    req.on("error", cb);
    req.write(serialize(this));
    req.end();
};

module.exports = Message;
