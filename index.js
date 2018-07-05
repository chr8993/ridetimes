var express    = require("express");
var cors       = require("cors");
var app        = express();
var Themeparks = require("themeparks");
var chalk      = require("chalk");
var moment     = require("moment");

app.use(cors());

var sixFlagsGreatAmerica = new Themeparks.Parks.SixFlagsGreatAmerica();

app.get("/ridetimes", function(req, res) {
  sixFlagsGreatAmerica.GetWaitTimes().then(function(rides) {
      // print each wait time
      console.log(chalk.cyan(`Loaded ${rides.length} rides..`));
      res.setHeader('Content-Type', 'application/json');
      var data = [];
      for(var a = 0; a < rides.length; a++) {
        var ride = rides[a];
        var lastUpdated = moment(ride.lastUpdate, "x");
        ride.lastUpdated = lastUpdated.fromNow();
        data.push(ride);
      }
      res.send(JSON.stringify(data));
  });
});

app.listen(3030, function() {
  var m = `Six Flags server listening on port 3030.`;
  console.log(chalk.bgWhite.cyan(m));
});
