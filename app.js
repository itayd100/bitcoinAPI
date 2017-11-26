const fs = require('fs');
const bitstamp = require('./bitstamp/bitstamp');
var coinName = 'btcusd'
var coin = 1.0;
var newRate = 0;


setInterval(function(){

  bitstamp.getValue(coinName, (errorMessage, coinResults) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
      console.log(`The high is: ${coinResults.high}\nThe last is: ${coinResults.last}\nThe timestamp is: ${coinResults.timestamp}\nThe bid is: ${coinResults.bid}\nThe vwap is: ${coinResults.vwap}\nThe volume is: ${coinResults.volume}\nThe low is: ${coinResults.low}\nThe ask is: ${coinResults.ask}\nThe open is: ${coinResults.open}\n`);
      newRate = coinResults.last;
      console.log (`the new rate is: ${newRate}`);
      console.log (`the change is: ${newRate-coin}`);
      console.log ('');
      console.log ('')

      fs.appendFile('data.txt', `${coinResults.timestamp},${coinResults.high},${coinResults.last},${coinResults.bid},${coinResults.vwap},${coinResults.volume},${coinResults.low},${coinResults.ask},${coinResults.open}\n`, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }
  });

  coin = newRate;

}, 10000); // this will log 'hi' every half second until you clear the interval
