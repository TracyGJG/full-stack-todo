const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const CrudInterface = require('./crud-interface.js');

const app = express();
const PORT = 3000;

const API_URL = '/toDos';
const UI_PATH = 'frontend';

let crudInterface;
(async function () {
	crudInterface = await CrudInterface();
})();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', UI_PATH)));

app.get(API_URL, async (_req, res) => {
	const toDoList = await crudInterface.readToDoList();
	res.send(toDoList.map(({ text, done, _id }) => ({ text, done, id: _id })));
});

app.post(API_URL, (req, res) => {
	crudInterface.createToDo(req.body.text);
	res.send('OK');
});

app.patch(`${API_URL}/:id`, (req, res) => {
	crudInterface.updateToDo(req.params.id);
	res.send('OK');
});

app.delete(`${API_URL}/:id`, (req, res) => {
	crudInterface.deleteToDo(req.params.id);
	res.send('OK');
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
