var m1 = require("m1");
var f = require("./blah.txt");
var qqq = require("./blah.qqq");
var bar = require("bar");
var data = require("./data");
var data2 = require(__dirname + "/data2.js");
m1(f, qqq, bar, data, data2);
