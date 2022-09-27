const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Handlebars
app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowedProtoMethodsByDefault: true
    }
}));

// Body - Parser
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'hbs');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
// Database
const db = require('./config/database');

// Test Db
db.authenticate()
    .then(() => console.log("Database connected..."))
    .catch((err) => console.log(err, "Failed to connect with database"));

// Index Route
app.get("/", (req, res) => res.render("index", {
    layout: 'landing'
}));

// Findwork Routes
app.use('/fw', require('./routes/fw'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));