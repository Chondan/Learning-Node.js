# Node.js Tutorial
- Node.js is an open source server environment
- Node.js allows you to run JavaScript on the server.

## Node.js Introduction

### What is Node.js?
- Node.js is an open source server environment
- Node.js is free
- Node.js runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.)
- Node.js uses JavaScript on the server

### Why Node.js?
- **Node.js uses asynchronous programming!**

A common task for a web server can be to open a file on the server and return the content to the client.

Here is how PHP or ASP handles a file request:
1. Sends the task to the computer's file system.
2. Waits while the file system opens and reads the file.
3. Returns the content to the client.
4. Ready to handle the next request.

Here is how Node.js handles a file request:
1. Sends  the task to the computer's file system.
2. Ready to handle the next request.
3. When the file system has opened and read file, the server returns the content to the client.

Node.js eliminates the waiting, and simply continues with the next request.

Node.js runs single-threaded, non-blocking, asynchronously programming, which is very memory efficient.

### What Can Node.js Do?
- Node.js can generate dynamic page content.
- Node.js can create, open, read, write, delete, and close files on the server
- Node.js can collect form data
- Node.js can add, delete, modify data in your database

### What is a Node.js File?
- Node.js files contain tasks that will be executed on certain events
- A typical event is someone trying to access a port on the server
- Node.js files must be initiated on the server before having any effect
- Node.js files have extension ".js"

---

## Node.js Modules

### What is a Module in Node.js?
Consider modules to be the same as JavaScript libraries.

A set of functions you want to include in your application

### Built-in Modules
Node.js has a set of built-in modules which you can use without any further installation.

### Include Modules
To include a module, use the `require()` function with the name of the module:

`const http = require('http');`

---

## Node.js HTTP Module

### The Built-in HTTP Module
Node.js has a built-in module called HTTP, which allows Node.js to transfer data over the Hyper Test Transfer Protocol (HTTP).

### Node.js as a Web Server
The HTTP module can create an HTTP server that listens to server ports and gives a response back to the client.

Use the `createServer()` method to create an HTTP server

```JavaScript
const http = require('http');

// create a server object
http.createServer(function (req, res) {
	res.write("Hello World!"); // write a response to the client
	res.end(); // end the response
}).listen(8080); // the server object listens on port 8080
```

The function passed into the `http.createServer()` method, will be executed when someone tries to access the computer on port 8080.

### Add an HTTP Header
If the response from the HTTP server is supposed to be displayed as HTML, you should include an HTTP header with the correct content type:

```JavaScript
const http = require('http');

// create a server object
http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write("Hello World!"); // write a response to the client
	res.end(); // end the response
}).listen(8080); // the server object listens on port 8080
```

The first argument of the `res.writeHead()` method is the status code, 200 means that all is OK, the seconde argument is an object containing the response headers.

### Read the Query String 
The function passed into the `http.createServer()` has a `req` argument that represents the request from the client, as an object (http.IncomingMessage object).

This object has a property called "url" which holds the part of the url that comes after the domain name:

```JavaScript
const http = require('http');
http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(req.url);
	res.end();
}).listen(8080);
```

### Split the Query String
There are built-in modules to easily split the query string into readable parts, such as the URL module.

```JavaScript
const http = require('http');
const url = require('url');
http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html' });
	const q = url.parse(req.url, true).query;
	console.log(q);
	const txt = q.year + " " + q.month;
	res.end(txt);
}).listen(8080);
```

The address: http://127.0.0.1:8080/?year=2017&month=July will produce this result: `2017 July`

## Node.js File System Module

### Node.js as a File Server
The Node.js file system module allows you to work with the file system on your computer. 

To include the File System module, use the `require()` method:

`const fs = require('fs');`

Common use for the File System module:
- Read files
- Create files
- Update files
- Delete files
- Rename files

### Read Files
The `fs.readFile()` method is used to read files on your computer.

Assume we have the following HTML file (located in the same folder as Node.js):

```html
<html>
<body>
<h1>My Header</h1>
<p>My paragraph.</p>
</body>
</html>
```

Create a Node.js file that reads the HTML file, and return the content:

```JavaScript
const http = require('http');
const fs = require('fs');
http.createServer(function (req, res) {
	fs.readFile('demofile1.html', function(err, data) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write(data);
		return res.end();
	});
}).listen(8080);
```

### Create Files
The File System module has methods for creating new files:
- `fs.appendFile()`
- `fs.open()`
- `fs.writeFile()`

The `fs.appendFile()` method appends specified content to a file. If the file does not exist, the file will be created

Example: Create a new file using the appendFile() method:

```JavaScript
const fs = require('fs');
fs.appendFile("mynewfile1.txt", "Hello content!", function (err) {
	if (err) throw err;
	console.log("Saved!");
	return res.end();
})
```

The `fs.open()` method takes a "flag" as the second argument, if the flags is "w" for "writing", the specified file is opened for writing. If the file does not exist, an empty file is created:

Example: Create a new, empty file using the open() method:

```JavaScript
const fs = require('fs');
fs.open("mynewfile2.txt", 'w', function (err, file) {
	if (err) throw err;
	console.log("Saved!");
	return res.end();
});
```

The `fs.writeFile()` method replaces the specified file and content if it exists. If the file does not exist, a new file, containing the specified content, will be created:

Example: Create a new file using the writeFile() method:

```JavaScript
const fs = require('fs');
fs.writeFile("mynewfile3.txt", "Hello content!", function (err) {
	if (err) throw err;
	console.log("Saved!");
	return res.end();
})
```

### Update Files
The File System module has methods for updating files:
- `fs.appendFile()`
- `fs.writeFile()`

The `fs.appendFile()` method appends the specified content at the end of the specified file:

Example: Append "This is my text." to the end of the file "mynewfile1.txt":

```JavaScript
const fs = require('fs');
fs.appendFile("mynewfile1.txt", "This is my text", function (err) {
	if (err) throw err;
	console.log("Updated!");
	return res.end();
})
```

The `fs.writeFile()` method replaces the specified file and content:

Example: Replace the content of the file "mynewfile3.txt":

```JavaScript
const fs = require('fs');
fs.writeFile("mynewfile3.txt", "This is my text", function (err) {
	if (err) throw err;
	console.log("Replaced!");
	return res.end();
})
```

### Delete Files
To delete a file with the File System module, use the `fs.unlink()` method.

The `fs.unlink()` method deleted the specified file:

Example: Delete "mynewfile2.txt":

```JavaScript
const fs = require('fs');
fs.unlink("mynewfile2.txt", function (err) {
	if (err) throw err;
	console.log("File Deleted!");
	return res.end();
})
```

### Rename Files
To rename a file with the File System module, use the `fs.rename()` method.

The `fs.rename()` method renames the specified file:

Example: Rename "mynewfile1.txt" to "myrenamedfile.txt"

```JavaScript
fs.rename("mynewfile1.txt", "myrenamedfile.txt", function (err) {
	if (err) throw err;
	console.log("File Renamed!");
	return res.end();
})
```

---

## Node.js URL Module
### The Built-in URL Module
The URL module splits up a web address into readable parts.

To include the URL module, use the `require()` method:

Parse an address with the `url.parse()` method, and it will return a URL object with each part of the address as properties

Example: Split a web address into readable parts:

```JavaScript
const url = require('url');
const adr = "http://localhost:8080/default.htm?year=2017&month=february":
const q = url.parse(adr, true);

console.log(q.host); // returns 'localhost:8080'
console.log(q.pathname); // returns '/default.htm'
console.log(q.search); // returns '?year=2017&month=february'

const qdata = q.query; // returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); // returns 'february'
```

### Node.js File Server
Now we know how to parse the query string, and in the previous chapter we learned how to make Node.js behave as a file server. Let us combine the two, and serve the file requested by the client.

Example: Request file from url -> http://127.0.0.1:8080/demofile1.html

```JavaScript
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
```

---

## Node.js NPM
NPM is a package manager for Node.js packages, or modules if you like.

The NPM program is installed on your computer when yon install Node.js

> NPM is already ready to run on your computer!

### What is a Package?
A package in Node.js contains all the files you need for a module.

Modules are JavaScript libraries you can include in your project.

### Download a Package
Downloading a package is very easy. 

Open the command line interface and tell NPM to download the package you want.

I want to download a package called "upper-case":

`npm install upper-case`

NPM creates a folder name "node_modules", where the package will be placed. All packages you install in the future will be placed in this folder.

--- 

## Node.js Events
Node.js is perfect for event-driven applications.

### Events in Node.js
Every action on a computer is an event. Like when a connection is made or a file is opened. Objects in Node.js can fire events, like readStream object fires events when opening and closing a file:

```JavaScript
const fs = require('fs');
const rs = fs.createReadStream("./demofile.txt");
rs.on('open', function() {
	console.log("The file is open");
})
```

### Events Module
Node.js has a built-in module, called "Events", where you can create-, fire-, and listen for- your own events.

To include the built-in Events module use the `require()` method. In addition, all event properties and methods are an instance of an EventEmitter object. To be able to access these properties and methods, create an EventEmitter object

```JavaScript
const events = require('events');
const EventEmitter = new events.EventEmitter();
```

### The EventEmitter Object
You can assign event handlers to your own events with the EventEmitter object.

In the example below we have created a function that will be executed when a "scream" event is fired.

To fire an event, use the `emit()` method.

```JavaScript
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
```

--- 

## Node.js Upload Files

### The Formidable Module
There is a very good module for working with file uploads, called "Formidable".

The Formidable module can be downloaded and installed using NPM:

```JavaScript
const formidable = require('formidable');
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
```

---

## Node.js Email

### The Nodemailer Module
The Nodemailer module makes it easy to send emails from your computer.

The Nodemailer module can be downloaded and installed using npm:

`npm install nodemailer`

After you have downloaded the Nodemailer module, you can include the module in any application:

`const nodemailer = require('nodemailer');`

### Send an Email

```JavaScript
function sendEmail() {
	const nodemailer = require('nodemailer');

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "stampcs7@gmail.com",
			pass: "" // using App password
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
```

