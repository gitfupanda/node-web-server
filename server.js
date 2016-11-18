const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

// logger
app.use((req, res, next) => {
    var now = new Date().toUTCString();
    var log = `[${now}] ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n')
    next();
});

// maintenance redirect
app.use((req, res, next) => {
    var now = new Date().toUTCString();
    var log = `[${now}] ${req.method} ${req.url} >> redirected to maintenance page.`;
    console.log(log);
    fs.appendFile('server.log', log + '\n')
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Landing Home',
        welcomeMessage: 'Welcome to Express'
        
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About apage'
        
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: "This is a bad request"
    });
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});