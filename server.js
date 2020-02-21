const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

// Bodyparser middleware
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);

app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

const logRequestStart = (req, res, next) => {
	console.log(req.isAuthenticated());
	console.info(`${req.method} ${req.originalUrl}`);
	next()
}

app.use(logRequestStart);

// Mongoose
require("./models/index")();

// Passport config
require("./config/passport")(passport);

// Routes
require("./routes/index")(app);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
