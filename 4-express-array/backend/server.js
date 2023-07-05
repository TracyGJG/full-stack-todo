const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const CrudInterface = require('./crud-interface.js');

const app = express();
const port = 3000;

const crudInterface = CrudInterface();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/toDos', (_req, res) => {
	res.json(crudInterface.readToDoList());
});

app.post('/toDos', (req, res) => {
	crudInterface.createToDo(req.body.text);
	res.send('OK');
});

app.patch('/toDos/:id', (req, res) => {
	crudInterface.updateToDo(+req.params.id);
	res.send('OK');
});

app.delete('/toDos/:id', (req, res) => {
	crudInterface.deleteToDo(+req.params.id);
	res.send('OK');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
