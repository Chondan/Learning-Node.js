const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');

const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');

app.use('/', function(req, res, next) {
	console.log("Request was made: " + req.url);
	next();
});

app.use('/assets', express.static('stuff'));

app.get('/', function(req, res) {
	res.render('index', {});
});

app.get('/contact', function(req, res) {
	res.render('contact', { qs: req.query });
});

app.post('/contact', urlencodedParser, function(req, res) {
	res.render('contact-success', { data: req.body });
});

app.get('/profile/:name/:id', function(req, res) {
	const { name, id } = req.params;
	res.send(`This is the profile page of ${name}, id = ${id}`);
});

app.get('/profile/:name', function(req, res) {
	const { name } = req.params;
	res.render('profile', { person: name, data: { age: 22, hobbies: ["Playing Football", "Listening to music", "Playing Chess"], job: "Software Engineer" }});
});

app.listen(3000, () => {
	console.log("Server started: Listening at port 3000");
});