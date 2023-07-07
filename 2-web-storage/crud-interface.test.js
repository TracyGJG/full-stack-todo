import CrudInterface from './crud-interface';
import TestData from '../db.json';

function MockWebSessionStorage(
	sessionStore = {
		data: JSON.stringify(TestData.toDos),
	}
) {
	return {
		getItem(_) {
			return sessionStore.data;
		},
		setItem(_, data) {
			sessionStore.data = data;
		},
	};
}

const toDoStore = _ => JSON.parse(_.getItem());

describe('CRUD Interface', () => {
	it('can support adding a new to-do item', () => {
		const mockWebSessionStorage = MockWebSessionStorage();
		const crudInterface = CrudInterface(mockWebSessionStorage);
		let result = toDoStore(mockWebSessionStorage);
		expect(result.length).toBe(2);

		crudInterface.createToDo('Test Three');
		result = toDoStore(mockWebSessionStorage);
		expect(result.length).toBe(3);
		expect(result[2].id).toBe('3');
		expect(result[2].text).toBe('Test Three');
		expect(result[2].done).toStrictEqual(false);
	});

	it('can support reading a list of to-do items', () => {
		const mockWebSessionStorage = MockWebSessionStorage();
		const crudInterface = CrudInterface(mockWebSessionStorage);

		const result = crudInterface.readToDoList();
		expect(result.length).toBe(2);
		expect(result[0]).not.toBe(toDoStore(mockWebSessionStorage)[0]);
	});

	it('can support updating of a to-do item to done', () => {
		const mockWebSessionStorage = MockWebSessionStorage();
		const crudInterface = CrudInterface(mockWebSessionStorage);

		let result = toDoStore(mockWebSessionStorage);
		expect(result.length).toBe(2);
		expect(result[1].done).toStrictEqual(false);

		crudInterface.updateToDo('2');
		result = toDoStore(mockWebSessionStorage);
		expect(result[1].done).toStrictEqual(true);
	});

	it('can support deletion of a to-do item', () => {
		const mockWebSessionStorage = MockWebSessionStorage();
		const crudInterface = CrudInterface(mockWebSessionStorage);

		let result = toDoStore(mockWebSessionStorage);
		expect(result.length).toBe(2);

		crudInterface.deleteToDo('2');
		result = toDoStore(mockWebSessionStorage);
		expect(result.length).toBe(1);
	});
});
