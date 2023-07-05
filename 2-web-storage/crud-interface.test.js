import CrudInterface from './crud-interface';

function MockWebSessionStorage(
	sessionStore = {
		data: '[]',
	}
) {
	return {
		clear() {
			sessionStore.data = '[]';
		},
		getItem(_) {
			return sessionStore.data;
		},
		setItem(_, data) {
			sessionStore.data = data;
		},
	};
}

describe('CRUD Interface', () => {
	let mockWebSessionStorage;
	let crudInterface;

	beforeEach(() => {
		mockWebSessionStorage = MockWebSessionStorage();
		mockWebSessionStorage.clear();
		crudInterface = CrudInterface(mockWebSessionStorage);
	});

	it('can support adding a new to-do item', () => {
		expect(mockWebSessionStorage.getItem()).toBe('[]');

		crudInterface.createToDo('First To-Do');
		expect(mockWebSessionStorage.getItem()).toBe(
			'[{"text":"First To-Do","id":"1","done":false}]'
		);
	});

	it('can support reading a list of to-do items', () => {
		mockWebSessionStorage.setItem(
			'_',
			'[{"text":"First To-Do","id":"1","done":false},{"text":"Second To-Do","id":"2","done":true}]'
		);

		const result = crudInterface.readToDoList();
		expect(result.length).toBe(2);

		expect(result[0].id).toBe('1');
		expect(result[0].text).toBe('First To-Do');
		expect(result[0].done).toStrictEqual(false);

		expect(result[1].id).toBe('2');
		expect(result[1].text).toBe('Second To-Do');
		expect(result[1].done).toStrictEqual(true);
	});

	it('can support updating of a to-do item to done', () => {
		mockWebSessionStorage.setItem(
			'_',
			'[{"text":"First To-Do","id":"1","done":false}]'
		);
		const result = crudInterface.readToDoList();
		expect(result.length).toBe(1);

		crudInterface.updateToDo('1');
		expect(mockWebSessionStorage.getItem()).toBe(
			'[{"text":"First To-Do","id":"1","done":true}]'
		);
	});

	it('can support deletion of a to-do item', () => {
		mockWebSessionStorage.setItem(
			'_',
			'[{"text":"First To-Do","id":"1","done":false},{"text":"Second To-Do","id":"2","done":true}]'
		);
		const result = crudInterface.readToDoList();
		expect(result.length).toBe(2);

		crudInterface.deleteToDo('1');
		expect(mockWebSessionStorage.getItem()).toBe(
			'[{"text":"Second To-Do","id":"2","done":true}]'
		);
	});
});
