var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var corpusRouter = require("./routes/corpus");
var trainingSetRouter = require("./routes/trainingset");
var trainRoutes = require("./routes/train");
var vectorRoutes = require("./routes/classVectors");
var classifyRoutes = require("./routes/classifyDocument");
var statsRoutes = require("./routes/stats");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/corpus", corpusRouter);
app.use("/trainingset", trainingSetRouter);
app.use("/train", trainRoutes);
app.use("/train/run", trainRoutes);
app.use("/api/classVectors", vectorRoutes);
app.use("/classifyDocument", classifyRoutes);
app.use("/stats", statsRoutes);
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	res.status(err.status || 500);
	res.render("error");
});

// Filter the airline_reviews.csv if the filtered airline_reviews.json is empty.
const corpusDatabase = require("./database/corpus");
const fs = require("fs");
const filteredDataSetPath = path.join(__dirname, "database/airlines_reviews.json");

if (!fs.existsSync(filteredDataSetPath)) {
    console.log("File doesn't exist. Generating airlines_reviews.json dataset...");
    corpusDatabase.filterDataSet();
} else {
    try {
        const fileContent = fs.readFileSync(filteredDataSetPath, 'utf8');
        const jsonData = JSON.parse(fileContent);
        
        if (Array.isArray(jsonData) && jsonData.length === 0) {
            console.log("File is empty array. Generating airlines_reviews.json dataset...");
            corpusDatabase.filterDataSet();
        } else if (Object.keys(jsonData).length === 0) {
            console.log("File is empty object. Generating airlines_reviews.json dataset...");
            corpusDatabase.filterDataSet();
        } else {
            console.log("Dataset already exists. Skipping generation.");
        }
    } catch (error) {
        console.log("Error reading file or invalid JSON. Generating airlines_reviews.json dataset...");
        corpusDatabase.filterDataSet();
    }
}

module.exports = app;
