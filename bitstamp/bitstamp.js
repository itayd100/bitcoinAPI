const request = require('request');

var getValue = (coinName, callback) => {
  request({
    url: `https://www.bitstamp.net/api/v2/ticker/${coinName}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to bitstamp.net server.');
    } else if (response.statusCode === 400) {
      callback('Unable to fetch the value.');
    } else if (response.statusCode === 200) {
      callback(undefined, {
        high: body.high, //Last 24 hours price high.
        last: body.last, //Last BTC price.
        timestamp: body.timestamp, //Unix timestamp date and time.
        bid: body.bid, //Highest buy order.
        vwap: body.vwap, //Last 24 hours volume weighted average price.
        volume: body.volume, //Last 24 hours volume.
        low: body.low, //Last 24 hours price low.
        ask: body.ask, //Lowest sell order.
        open: body.open //First price of the day.
      });
    }
  });
};

module.exports.getValue = getValue;
