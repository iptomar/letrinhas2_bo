require('colors');

var express = require('express'),
  http = require('http'),
  teachers = require('./routes/teachers'),
  students = require('./routes/students'),
  tests = require('./routes/tests'),
  submissions = require('./routes/submissions'),
  schools = require('./routes/schools');

var app = express();

app.configure(function(){
  this.use(express.errorHandler({dumpException: true, showStack: true}));
});

app.configure(function(){
  this.use(express.bodyParser({uploadDir: __dirname + '/tmp'}));
  this.use('/', express.static(__dirname + '/public'));
  this.use(app.router);
});


app.post('/teachers', teachers.new);
app.get('/teachers', teachers.getAll);
app.get('/teachers/:id', teachers.get);

app.post('/students', students.new);
app.get('/students', students.getAll);
app.get('/students/:id', students.get);

app.post('/schools', schools.new);
app.get('/schools', schools.getAll);
app.get('/schools/:id', schools.get);

app.post('/tests', tests.new);
app.get('/tests', tests.getAll);
app.get('/tests/:id', tests.get);

app.get('/submissions', submissions.getAll);
app.get('/submissions/:id', submissions.get);

// app.post('/login', session.login);

var port = 8081;
console.log('Listening on %d'.green, port);

app.listen(port);
