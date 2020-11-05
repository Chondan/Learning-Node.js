const http = require('http');
const url = require('url');
const fs = require('fs');
const formidable = require('formidable');

function server() {
	http.createServer(function (req, res) {
		requestFileWithUrl(req, res);
		uploadFile(req, res);
	}).listen(8080);
}

function splitQueryString(req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html' });
	const q = url.parse(req.url, true).query;
	console.log(q);
	const txt = q.year + " " + q.month;
	res.end(txt);
}

function readFile(req, res) {
	fs.readFile('demofile1.html', function(err, data) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write(data);
		return res.end();
	});
}

function createFile(req, res) {
	fs.appendFile("mynewfile1.txt", "Hello content!", function (err) {
		if (err) throw err;
		console.log("Saved!");
		return res.end();
	})
}

function openFile(req, res) {
	fs.open("mynewfile2.txt", "w", function (err, file) {
		if (err) throw err;
		console.log("Saved!");
		return res.end();
	})
}

function writeFile(req, res) {
	fs.writeFile("mynewfile3.txt", "Hello content!", function (err) {
		if (err) throw err;
		console.log("Saved!");
		return res.end();
	})
}

function updateFileWithAppend(req, res) {
	fs.appendFile("mynewfile1.txt", "This is my text", function (err) {
		if (err) throw err;
		console.log("Updated!");
		return res.end();
	})
}

function replaceSpecifiedFileAndContent(req, res) {
	fs.writeFile("mynewfile3.txt", "This is my text", function (err) {
		if (err) throw err;
		console.log("Replaced!");
		return res.end();
	})
}

function deleteFile(req, res) {
	fs.unlink("mynewfile2.txt", function (err) {
		if (err) throw err;
		console.log("File Deleted!");
		return res.end();
	})
}

function renameFile(req, res) {
	fs.rename("mynewfile1.txt", "myrenamedfile.txt", function (err) {
		if (err) throw err;
		console.log("File Renamed!");
		return res.end();
	})
}

function requestFileWithUrl(req, res) {
	const q = url.parse(req.url, true);
	const filename = "." + q.pathname;
	fs.readFile(filename, function (err, date) {
		if (err) {
			res.writeHead(404, { 'Content-Type': 'text/html' });
			return res.end("404 Not Found");
		}
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write(date);
		return res.end();
	})
}

function events() {
	const events = require('events');
	const EventEmitter = new events.EventEmitter();

	// Create an event handler:
	const myEventHandler = function () {
		console.log("I hear a scream!");
	}

	// Assign the event handler to an event
	EventEmitter.on('scream', myEventHandler);

	// Fire the 'scream' event:
	EventEmitter.emit('scream');
}

function uploadFile(req, res) {
	console.log(req.url);
	if (req.url == '/fileupload') {
		const form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {
			console.log(files.filetoupload);
			const oldpath = files.filetoupload.path;
			const newpath = '/home/chondan/Desktop/CHONDAN/Coding/Node.js/1. Node.js Tutorial/' + files.filetoupload.name;
			fs.rename(oldpath, newpath, function (err) {
				if (err) throw err;
				// res.write("File uploaded and moved!");
				// res.end();
			});
			console.log(oldpath, newpath);
		});
	} else {
		console.log("Oops");
	}
}

function sendEmail() {
	const nodemailer = require('nodemailer');

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "stampcs7@gmail.com",
			pass: "rgdacyerzuodctvv" // using App password
		}
	});

	const mailOptions = {
		from: "stampcs7@gmail.com",
		to: "chondansusuwan@gmail.com",
		subject: "Sending Email using Node.js",
		text: "That was easy!"
	};

	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	})
}
sendEmail();