import CrudInterface from './crud-interface';

async function toDoStore() {
	const toDosRaw = await fetch('http://localhost:3000/toDos');
	const toDosList = await toDosRaw.json();
	return toDosList;
}

describe('CRUD Interface', () => {
	it('can support adding a new to-do item', async () => {
		let crudInterface = CrudInterface();
		let result = await toDoStore();
		expect(result.length).toBe(2);

		await crudInterface.createToDo('Test Three');
		result = await toDoStore();
		expect(result.length).toBe(3);
		expect(result[2].id).toBe('3');
		expect(result[2].text).toBe('Test Three');
		expect(result[2].done).toStrictEqual(false);
	});

	it('can support reading a list of to-do items', async () => {
		let crudInterface = CrudInterface();

		const result = await crudInterface.readToDoList();
		expect(result.length).toBe(3);
	});

	it('can support updating of a to-do item to done', async () => {
		let crudInterface = CrudInterface();

		let result = await toDoStore();
		expect(result.length).toBe(2);
		expect(result[2].done).toStrictEqual(false);

		await crudInterface.updateToDo('3');

		result = await toDoStore();
		expect(result[2].done).toStrictEqual(true);
	});

	it('can support deletion of a to-do item', async () => {
		let crudInterface = CrudInterface();

		let result = await toDoStore();
		expect(result.length).toBe(3);

		crudInterface.deleteToDo('2');
		result = await toDoStore();
		expect(result.length).toBe(2);
	});
});
