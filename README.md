# Node.js KwikDesk.com API Client

Send messages and search for messages.

## Installation

The following will install [the npm package](https://www.npmjs.org/package/kwikdesk) and add it as a dependency to your project:

    npm install kwikdesk --save

## Usage

Require this package after installing with npm:

```javascript
var Kwikdesk = require('kwikdesk');
```

Send a 'kwik' message that expires in 1440 minutes (24 hours):

```javascript
Kwikdesk.message("Playing around with the KwikDesk API #nodejs", 1440, function (err, response) {
    if (err) return console.log(err, response);
    console.log("Message posted");
});
```

Search for messages tagged #nodejs (that haven't yet expired):

```javascript
Kwikdesk.search("nodejs", function (err, results) {
    if (err) return console.log(err);
    var now = Date.now() / 1000 | 0;
    for (var i = 0; i < results.length; i++) {
        var expires_in = (results[i].expires - now) / 60 | 0;
        console.log(results[i].content + " (expires in " + expires_in + " min)");
    }
});
```

The output of the search above would be something like:

    Testing the KwikDesk search now #nodejs (expires in 1439 min)
    Playing around with the KwikDesk API #nodejs (expires in 1433 min)

See the [KwikDesk developer documentation](https://developer.kwikdesk.com/) for more details.

## Error Handling

Each of the callback functions (passed to `message` and `search`) have `err` as their first parameter.
If something went wrong then `err` will be an `Error` object with an additional `code` property containing the KwikDesk error code.

See [KwikdeskError](src/error.js) for the list of error codes that KwikDesk may return.

## License

This project is released under the MIT License.
