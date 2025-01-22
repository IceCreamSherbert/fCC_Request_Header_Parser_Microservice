// Import .env file and express, set "app" to be the server object
require("dotenv").config();
const express = require("express");
const app = express();

// Enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
// Serve static css file from public directory using middleware
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
// Home http route that serves the html file
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// API endpoint route that returns a greeting in JSON
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// API endpoint route that returns headers in JSON
app.get("/api/whoami", (req, res) => {
  res.json({ 
    "ipaddress": req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    "language": req.headers['accept-language'],
    "software": req.headers['user-agent']
   })
})

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
