var Message = require('./message');
var Search = require('./search');

function Kwikdesk() {
}

Kwikdesk.message = function (content, ttl, cb) {
    var message = new Message({'content': content, 'delete': ttl});
    message.save(cb);
};

Kwikdesk.search = function (q, cb) {
    var search = new Search(q);
    search.execute(cb);
};

module.exports = Kwikdesk;
