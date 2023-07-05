import CrudInterface from './crud-interface';

describe.skip('CRUD Interface', () => {
	let crudInterface;

	beforeEach(() => {
		crudInterface = CrudInterface();
	});

	it('can support adding a new to-do item', async () => {
		await crudInterface.createToDo('First To-Do');
		await crudInterface.createToDo('Second To-Do');

		const toDoList = await crudInterface.readToDoList();
		expect(toDoList.length).toBe(2);
	});

	it('can support reading a list of to-do items', async () => {
		await crudInterface.createToDo('Third To-Do');

		const toDoList = await crudInterface.readToDoList();
		expect(toDoList.length).toBe(3);
	});

	it('can support updating of a to-do item to done', async () => {
		await crudInterface.updateToDo(3);

		const toDoList = await crudInterface.readToDoList();
		expect(toDoList.length).toBe(3);
	});

	it('can support deletion of a to-do item', async () => {
		await crudInterface.deleteToDo(1);
		let toDoList = await crudInterface.readToDoList();
		expect(toDoList.length).toBe(2);

		await crudInterface.deleteToDo(2);
		await crudInterface.deleteToDo(3);

		toDoList = await crudInterface.readToDoList();
		expect(toDoList.length).toBe(0);
	});
});
