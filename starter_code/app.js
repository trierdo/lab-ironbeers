/* var globalTunnel = require('global-tunnel-ng');globalTunnel.initialize({
 host: 'bluecoat.media-saturn.com',
 port: 80,
 proxyAuth: 'username:password', // optional authentication
 sockets: 50 // optional pool size for each http and https
});
process.env.http_proxy = 'http://bluecoat.media-saturn.com:80';
globalTunnel.initialize();

*/


const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(__dirname + '/views/partials')

app.get("/", (req, res, next) => {
  res.render("index");
});



app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {

      res.render("beers", {beers});  // trotz array, zwing es in objekt form
    })
    .catch(error => {
      console.log(error);
    });
});





app.get("/random-beers", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beers => {
      res.render("random-beers", beers[0]);
      console.log(beers);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);
