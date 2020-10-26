const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes");

//Define Middeware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//For Connecting to MongoDB
const mongoose = require("mongoose");

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactgooglebooks"
);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Add Routes-API & view
app.use(routes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
