require('colors');

var express = require('express'),
  http = require('http'),
  teachers = require('./routes/teachers'),
  students = require('./routes/students'),
  classes = require('./routes/classes'),
  tests = require('./routes/tests'),
  submissions = require('./routes/submissions'),
  schools = require('./routes/schools'),
  bodyParser = require('body-parser');

var app = express();

app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.post('/teachers', teachers.new);
app.get('/teachers', teachers.getAll);
app.get('/teachers/:id', teachers.get);

app.post('/students', students.new);
app.get('/students', students.getAll);
app.get('/students/:id', students.get);

app.post('/classes', classes.new);
app.get('/classes', classes.getAll);
app.get('/classes/:id', classes.get);

app.post('/schools', schools.new);
app.get('/schools', schools.getAll);
app.get('/schools/:id', schools.get);

app.post('/tests', tests.new);
app.get('/tests', tests.getAll);
app.get('/tests/:id', tests.get);

app.post('/submissions', submissions.new);
app.get('/submissions', submissions.getAll);
app.get('/submissions/:id', submissions.get);

var port = 8081;
console.log('Listening on %d'.green, port);

app.listen(port);
