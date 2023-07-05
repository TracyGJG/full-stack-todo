import CrudInterface from './crud-interface';

describe('CRUD Interface', () => {
	it('can support adding a new to-do item', () => {
		const toDoStore = [];
		const crudInterface = CrudInterface(toDoStore);
		expect(toDoStore.length).toBe(0);

		crudInterface.createToDo('First To-Do');
		expect(toDoStore.length).toBe(1);
		expect(toDoStore[0].id).toBe('1');
		expect(toDoStore[0].text).toBe('First To-Do');
		expect(toDoStore[0].done).toStrictEqual(false);
	});

	it('can support reading a list of to-do items', () => {
		const toDoStore = [{ id: '1', text: 'First To-Do', done: false }];
		const crudInterface = CrudInterface(toDoStore);

		const result = crudInterface.readToDoList();
		expect(result.length).toBe(1);
		expect(result[0]).not.toBe(toDoStore[0]);
	});

	it('can support updating of a to-do item to done', () => {
		const toDoStore = [{ id: '1', text: 'First To-Do', done: false }];
		const crudInterface = CrudInterface(toDoStore);

		crudInterface.updateToDo('1');
		expect(toDoStore.length).toBe(1);
		expect(toDoStore[0].done).toStrictEqual(true);
	});

	it('can support deletion of a to-do item', () => {
		const toDoStore = [{ id: '1', text: 'First To-Do', done: false }];
		const crudInterface = CrudInterface(toDoStore);

		crudInterface.deleteToDo('1');
		expect(toDoStore.length).toBe(0);
	});
});
