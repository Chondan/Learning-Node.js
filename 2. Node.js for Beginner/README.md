# Node.js

## Introduction
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non blocking model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world...

### Node.js Actually is 
- A platform which allows us to run  JavaScript on a computer / server
- Read, delete and update files
- Easily communicate with a database

### Why is Node.js so Popular?
- It uses JavaScript
- Very fast (runs on the v8 engine & uses non-blocking code)
- Huge ecosystem of open source packages (npm)
- Great for real-time services (like chats)

### What We'll Learn...
- The inner workings of Node.js
	- V8 engine
	- Module
	- Event emitter
	- The file system
- Creating a web server
	- Routing
	- Express 
	- Templating
- Make a Node.js application (todo app)

---

## The V8 Engine
JavaScript Engines
- Computers do not understand JavaScript
- A JavaScript engine takes JavaScript, and converts it into something it does understand - machine code

Node.js was written in C++
- At the heart of Node.js is the V8 engine
- The V8 engine converts our JS into machine code

Node.js with V8
> JavaScript -> Node.js (V8) -> Machine Code

---

## The Global Object
- The global object is the window object (in the browser)

```JavaScript
console.log(__dirname);
console.log(__filename);
setTimeout(() => {}, 1000);
setInterval(() => {}, 1000);
```

---

## Function Expression

```JavaScript
// normal function statement
function sayHi() {
	console.log("hi");
}
sayHi();

// function expression
const sayBye = function() {
	console.log("bye");
}
sayBye();

function callFunction(func) {
	func();
}

callFunction(sayBye);
```

---

## Modules & require()
- split our code into logical modules.
- then we call it, whenever we need.

At count.js
```JavaScript
const counter = function(arr) {
	return `There are ${arr.length} elements in this array`;
};
module.exports = { counter };
```

At app.js
```JavaScript
const { counter } = require('./counter');
console.log(counter([1, 3, 5, 6]));
```

---

## Module Patterns
At stuff.js
```JavaScript
const pi = 3.14;
const adder = () => {};
module.exports.pi = pi
module.exports.adder = adder;

// OR 
module.exports.x = 10;

// OR
const y = 10;
module.exports = { varY: y };
```

At app.js
```JavaScript
const { pi, adder } = require('./stuff');
```

---

## The Event Module
```JavaScript
const events = require('events');

// create our own events
const myEmitter = new events.EventEmitter();
myEmitter.on('someEvent', function(msg) {
	console.log(msg);
})
myEmitter.emit('someEvent', 'Hello world, How are you doing?');
```

util module to inherit some methods or properties from one object to another object
```JavaScript
const util = require('util');

const Person = function(name) {
	this.name = name;
};

util.inherits(Person, events.EventEmitter);

const james = new Person("James");
const mary = new Person("Mary");
const ryu = new Person("Ryu");

const people = [james, mary, ryu];

people.forEach(function(person) {
	person.on('speak', function(msg) {
		console.log(`${person.name} said: ${msg}`);
	})
});

james.emit('speak', 'Hello, My name is James'); // James said: Hello, My name is James
```

---

## Reading & Writing Files

Synchronous programming
- It's blocking the code
```JavaScript
const fs = require('fs');

const x = fs.readFileSync('./readme.txt', 'utf-8'); // synchronous reading (read a file before go to another code) -> it's blocking code (blocking the flow of the code)
console.log(x);

fs.writeFileSync('./writeMe.txt', x);
```

Asynchronous programming (we need a callback function to fire when the process is completed)
- It's not blocking the code
```JavaScript
fs.readFile('./readMe.txt', 'utf-8', function(err, data) {
	fs.writeFile('.writeMe.txt', data, function(err) {
		if (err) throw err;
	})
});

// Delete file
fs.unlink('writeme.txt', err => {
	if (err) throw err;
});
```

--- 

## Creating & Removing Directories
Synchronously
```JavaScript
const fs = require('fs');

fs.mkdirSync('stuff'); // make
fs.rmdirSync('stuff'); // remove
```

Asynchronously
```JavaScript
fs.mkdir('stuff', fucntion() {
	fs.readFile('./readme.txt', 'utf-8', function(err, data) {
		fs.writeFile('./stuff/writeme.txt', data, function(err) {
			if (err) throw err;
		})
	})
});

fs.unlink('./stuff/writeme.txt', function() {
	fs.rmdir('./stuff/', function(err) {
		if (err) throw err;
	})
})
```

---

## Clients and Servers
1. CLIENT - REQUEST -> SERVER
2. CLIENT <- RESPONSE - SERVER

### Protocols
- A set of communication rules, that two sides agree to use when communicating

Each client or server can be identified by own unique IP address

> CLIENT (IP: 76.121.126.74) ------ SOCKET ------ SERVER (IP: 72.28.226.84)

- socket -> a channel that was information can be sent
- the information that sent is strunctured via different protocols for example HTTP or FTP

FTP is stand for File Transfer Protocol

HTTP is used for websites.

So when the stucture of the information that's being sent has been decided on for example HTTP. 

The information is then sent down this socket between the two computers vis a protocol called *TCP*.

So, although the data is structured in a particular way and that's going to be either HTTP or FTP or something.

The way that it's sent from the server to the client is via a protocal called *TCP*.

And what this essentially does is split up the data into smaller little sections like this and transfers them along the socket.

> <--- SOCKET --- o - o - o - o (PACKETS)

These small little sections are called packets. so all of this functionality is built into our computers and node.js gives us the ability to access this functionality to open a connection between two computers and send information between them.

So if we run node.js on a server we can tell node what information we want to send out to the client when they make a particular response.

### Ports
- A program runnning on a computer can listen for requrests sent to a particular port number
- Node.js or other programs running on the server listen to a particular port number, so if the request is sent to an IP address to a particular on that IP. If node.js is listening out for requests on that port it will respond otherwise it won't.
- E.g. 172.24.86.76:3000 (port number 3000)

---

## Creating a Server

### Response Headers

CLIENT --- REQUEST (request + requrest headers) --> SERVER
CLIENT <-- RESPONSE (response data + response headers) --- SERVER

Response Headers (extra informations about the request or the response)
- Content-Type -> plain text, HTML, json, etc.
- Status -> 200 (OK), 404 (PAGE NOT FOUND)

---

## Streams and Buffers

### Buffers
- Temporary storage spoot for a chunk of data that is being transferred from one place to another 
- The buffer is filled with data, then passed along
- Transfer small chunks of data at a time
- buffer collects small chunk of data together

> DATA PASSED ON <---- [ | | | | ] BUFFER <- | (small chunk of data) - DATA  

### Streams
- a stream of data that flows over time from one place to another 

> BUFFER <---- BUFFER <---- BUFFER <---- [ | | | ] BUFFER <---- | (small chunck of data)

when the buffer is fulled, it passes that chunk of data down the stream to be processed and sent to the client.

**The benefits of buffers and streams**
- We can start consuming data even before it's all arrived
- We don't have to gather all of the data in memory first and then consume it, we can do it bit by bit.

### Streams in Node.js
- Can create streams in Node.js to transfer data
- Increase performance

---

## Readable Streams

### Streams
- Writable streams -> allow node.js to write data to a stream
- Readable streams -> allow node.js to read data from a stream
- Duplex -> can read and write to a stream

```JavaScript
const fs = require('fs');

const myReadStream = fs.createReadStream(__dirname + '/readme.txt', 'utf-8');

// listening an event when receive a chunk of data
myReadStream.on('data', function(chunk) {
	console.log("new chunk received: ");
	console.log(chunk);
});
```

---

## Writable Streams

```JavaScript
const fs = require('fs');

const myReadStream = fs.createReadStream(__dirname + '/readme.txt', 'utf-8');
const myWriteStream = fs.createWriteStream(__dirname + '/writeme.txt');

myReadStream.on('data', function(chunk) {
	console.log("new chunk received: ");
	myWriteStream.write(chunk, function(err) {
		if (err) throw err;
	});
});
```

---

## Pipes
- We don't need to listen an 'data' event manually when we received a chunk of data
- Pipes do it for us automatically

```JavaScript
const fs = require('fs');

const myReadStream = fs.createReadStream(__dirname + '/readme.txt', 'utf-8');
const myWriteStream = fs.createWriteStream(__dirname + '/writeme.txt');

myReadStream.pipe(myWriteStream);
```

SERVER
```JavaScript
const http = require('http');
const fs = require('fs');

// create a server 
const server = http.createServer(function(req, res) {
	console.log("request was made: " + req.url);
	res.writeHead(200, { 'Content-Type': 'text/plain' }); // set the header

	const myReadStream = fs.createReadStream(__dirname + '/readme.txt', 'utf-8');
	myReadStream.pipe(res); // res (response object) is a writable stream

	// myReadStream.on('data', function(chunk) {
	// 		res.end(chunk);
	//})
});

// listen to particular port number
server.listen(3000, '127.0.0.1');
console.log("Listening to port 3000");
```

---

## Serving HTML Pages
```JavaScript
const http = require('http');
const fs = require('fs');

// create a server 
const server = http.createServer(function(req, res) {
	console.log("request was made: " + req.url);
	res.writeHead(200, { 'Content-Type': 'text/html' }); // set the header

	const myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf-8');
	myReadStream.pipe(res); // res (response object) is a writable stream
});

// listen to particular port number
server.listen(3000, '127.0.0.1');
console.log("Listening to port 3000");
```

**Note:** set the response header to tell the browser that the response file is html file (if we set the 'Content-Type' in the header to 'text/plain' instead, the browser will treat our response file as a plain text)

---

## Serving JSON
```JavaScript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	if (req.url != "/api") {
		return res.end();
	}
	console.log(`request from ${req.url}`);
	res.writeHead(200, { 'Content-Type': 'application/json' });
	const myObj = {
		name: "Chondan",
		job: "Software Engineer",
		age: 22
	};
	// res.end(JSON.stringify(myObj));

	fs.readFile('./myJson.json', function(err, data) {
		res.end(data);
	});
});

server.listen(3000);
console.log("Server started: Listenin at port 3000");
```

---

## Basic Routing
```JavaScript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	console.log(`requrest was made: ${req.url}`);
	if (req.url === '/home' || req.url === '/') {
		fs.readFile('./index.html', function(err, data) {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(data);
		});
	} else if (req.url === '/api') {
		const readableStream = fs.createReadStream('./myJson.json');
		readableStream.on('data', function(chunk) {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(chunk);
		});
	}
	else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end("404 Page Not Found");
	}
});

server.listen(3000);
console.log("Server started: Listenin at port 3000");
```

OR

```JavaScript
const http = require('http');
const fs = require('fs');

const server = http.createServer(function(req, res) {
	switch (true) {
		case req.url === '/' || req.url === '/home':
			res.writeHead(200, { 'Content-Type': 'text/html' });
			fs.createReadStream('./index.html').pipe(res);
			break;
		case req.url === '/api':
			res.writeHead(200, { 'Content-Type': 'application/json' });
			fs.readFile('./myJson.json', function(err, data) {
				res.end(data);
			});
			break;
		default:
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end('404 Page Not Found');
	}
});

server.listen(3000);
console.log("Server started: Listening at port 3000");
```

--- 

## The Node Package Manager (npm)

[NPM WEBSITE](https://www.npmjs.com/)

Commands
- `npm install [package]`
- `npm uninstall [package]`

- npm come installed with Node.js 
- a bunch of tools (third party packages or modules) to help out our node project

For Example
- [express.js](https://www.npmjs.com/package/express)
	- help us with routing, templating and etc.

---

## The package.json File
- keep track which package you installed, which package is depedency of your application.

--- 

## Installing Nodemon
- nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

[nodemon](https://www.npmjs.com/package/nodemon)

---

## Introduction to Express
- Easy and flexible routing system
- Integrates with many templating engines
- Contains a middleware framework

### HTTP Methods
- GET
- POST
- DELETE
- PUT

### Responding to Requests
- GET - app.get('route', fn)
- POST - app.post('route', fn)
- DELETE - app.delete('route', fn)

```JavaScript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send("Hello world");
});

app.get('/contact', (req, res) => {
	res.send("This is the contact page");
});

app.listen(3000);
```

---

## Express Route Parameters
- To handle with dynamic request

```JavaScript
app.get('/profile/:id', function(req, res) {
	// const { id } = req.params;
	res.send(`You requested to see a profile with the id of ${req.params.id}`);
});
```

---

## Template Engines
- embbed javascript code into html file

For Eample: 
- [ejs](https://www.npmjs.com/package/ejs)

```JavaScript
const app = express();

// By default, It gonna look a view (template) at views/ folder
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	const data = { age: 22, job: "Software Engineer", hobbies: ['Playing Football', 'Listening to music'] };
	res.render('home', { data }); // the first argument is the name of 'view' in views/ folder and the second argument is the data that we want to sent into our view (.ejs file)
});
```

```html
</html>
<body>
	<h1>Welcome to the profile of <%= person %></h1>
	<p><strong>Age: </strong><%= data.age %></p>
	<p><strong>Job: </strong><%= data.job %></p>
	<h2>Hobbies</h2>
	<ul>
		<% data.hobbies.forEach(hobby => { %>
			<li><%= hobby %></li>
		<% }); %>
	</ul>
</body>
</html>
```

---

## Partial Templates

At nav.ejs (partial template)
```xml
<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/contact">Contact</a></li>
	</ul>
</nav>
```

At other '.ejs' file that use the partial template
```ejs
<%- include('partials/nav'); %>
```

---

## Middleware & Static File
- the logic between the request and the response

```JavaScript
// Manually set up 
app.use('/assets', function(req, res, next) {
	console.log(req.url);
	next();
});

// with express method
app.use('/assets', express.static('assets')); 
// 1. the firest argument is use to match the route (not a directory name)
// 2. the seconde argument, we need to put the actually directory of our static files in express.static() method

app.use('/', function(req, res, next) {
	console.log(req.url, "middleware1");
	next();
});

app.use('/', function(req, res, next) {
	console.log(req.url, "middleware2");
	next();
});

app.get('/', function(req, res) {
	res.render('index', {});
});
```

--- 

## Query Strins
- mysite.com/blog/news?page=2
- Page = 2
- mysite.com/contact?person=ryu&dept=marketing
- Parse the request, and pull out the data

```JavaScript
app.get('/contact', function(req, res) {
	res.render('contact', { qs: req.query });
});

// OR
const url = require('url');
const address = "https://site.com?name=Chondan&dep=IT";
const q = url.parse(address, true);
console.log(q.host, q.pathname, q.search);
const qdata = q.query;
console.log(qdata); // { name: "Chondan", dept: "IT" }
```

---

## POST Requests
- POST is a request method
- POST requests, ask the server to accept/store data which is enclosed in the body of the request
- Often used when submitting forms 

library
- body parser -> `npm install body-parser`

```JavaScript
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.post('/contact', urlencodedParser, function(req, res) {
	res.render('contact-success', { data: req.body });
});
```