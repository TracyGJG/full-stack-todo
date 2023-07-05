export default function (webStore = window.sessionStorage) {
	let index = 1;
	let toDoList = JSON.parse(webStore.getItem('toDoList') || `[]`);

	return {
		createToDo,
		readToDoList,
		updateToDo,
		deleteToDo,
	};

	function createToDo(toDoText) {
		toDoList.push({
			text: toDoText,
			id: `${index++}`,
			done: false,
		});
		webStore.setItem('toDoList', JSON.stringify(toDoList));
	}

	function readToDoList() {
		toDoList = JSON.parse(webStore.getItem('toDoList') || `[]`);
		return toDoList;
	}

	function updateToDo(toDoId) {
		const toDoItem = toDoList.find(toDo => toDo.id === toDoId);
		if (toDoItem) {
			toDoItem.done = true;
		}
		webStore.setItem('toDoList', JSON.stringify(toDoList));
	}

	function deleteToDo(toDoId) {
		toDoList = toDoList.filter(toDo => toDo.id !== toDoId);
		webStore.setItem('toDoList', JSON.stringify(toDoList));
	}
}
