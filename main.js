require('colors');

var express = require('express'),
  http = require('http'),
  schools = require('./routes/schools');
  teachers = require('./routes/teachers'),
  students = require('./routes/students'),
  tests = require('./routes/tests'),
  questions = require('./routes/questions'),
  submissions = require('./routes/submissions');

var app = express();

app.configure(function(){
  this.use(express.errorHandler({dumpException: true, showStack: true}));
});

app.configure(function(){
  this.use(express.bodyParser({uploadDir: __dirname + '/tmp'}));
  this.use('/', express.static(__dirname + '/public'));
  this.use(app.router);
});

//Professores
app.post('/teachers', teachers.new);
app.post('/teachers/:id', teachers.upDate);
app.get('/teachers', teachers.getAll);
app.get('/teachers/:id', teachers.get);

//Alunos
app.post('/students', students.new);
app.post('/students/:id', students.upDate);
app.get('/students', students.getAll);
app.get('/students/:id', students.get);

//Escolas
app.post('/schools', schools.new);
app.post('/schools/:id', schools.upDate);
app.get('/schools', schools.getAll);
app.get('/schools/:id', schools.get);

//Testes
app.post('/tests', tests.new);
app.post('/tests/:id', tests.upDate);
app.get('/tests', tests.getAll);
app.get('/tests/:id', tests.get);

//Perguntas
app.post('/questions', questions.new);
app.post('/questions/:id', questions.upDate);
app.get('/questions', questions.getAll);
app.get('/questions/:id', questions.get);

//Resoluçoes
app.get('/submissions', submissions.getAll);
app.post('/submissions/:id', submissions.upDate);
app.get('/submissions/:id', submissions.get);


// app.post('/login', session.login);

var port = 8081;
console.log('Listening on %d'.green, port);

app.listen(port);
