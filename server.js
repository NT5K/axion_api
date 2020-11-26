
const express = require('express');
const app = express();
const htmlRoutes = require('./app/routing/htmlRoutes');
const apiRoutes = require('./app/routing/apiRoutes');

const port = process.env.PORT || 5000; 

// public folders
app.use(express.static(__dirname + '/app/public'));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.json({ type: 'application/*+json' }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//routes
app.use(htmlRoutes);
app.use(apiRoutes);

// use html and api files
require('./app/routing/htmlRoutes.js');
require('./app/routing/apiRoutes.js');

// listener for console
app.listen(port, () => console.log(`listening on port ${port}!`));


