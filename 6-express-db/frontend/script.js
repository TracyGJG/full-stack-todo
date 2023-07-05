import CrudInterface from './crud-interface.js';

const showToDoItem = toDo =>
	toDoItem.innerHTML
		.replace('toDoAction', toDo.done ? 'Del' : 'Done')
		.replace('{toDoTitle}', toDo.text)
		.replaceAll('{toDoId}', toDo.id);
const showToDoList = toDos =>
	(toDoList.innerHTML = toDos.map(showToDoItem).join(''));

const crudInterface = CrudInterface();

async function getToDoList() {
	const toDos = await crudInterface.readToDoList();
	showToDoList(toDos);
}

toDoForm.addEventListener('click', async evt => {
	if (evt.target.nodeName === 'BUTTON') {
		if (evt.target.textContent === 'Add') {
			await crudInterface.createToDo(txtToDoTitle.value);
			txtToDoTitle.value = '';
		}
		if (evt.target.textContent === 'Done') {
			await crudInterface.updateToDo(evt.target.dataset.todo);
		}
		if (evt.target.textContent === 'Del') {
			await crudInterface.deleteToDo(evt.target.dataset.todo);
		}
		getToDoList();
	}
});

txtToDoTitle.addEventListener('input', evt => {
	btnAddToDo.disabled = !evt.target.value.length;
});

getToDoList();
