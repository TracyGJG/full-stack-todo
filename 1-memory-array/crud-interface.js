export default function (toDoList = []) {
	let index = toDoList.length + 1;

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
	}

	function readToDoList() {
		return structuredClone(toDoList);
	}

	function updateToDo(toDoId) {
		const toDoItem = toDoList.find(toDo => toDo.id === toDoId);
		if (toDoItem) {
			toDoItem.done = true;
		}
	}

	function deleteToDo(toDoId) {
		const toDoItemIndex = toDoList.findIndex(toDo => toDo.id === toDoId);
		if (toDoItemIndex > -1) {
			toDoList.splice(toDoItemIndex, 1);
		}
	}
}
