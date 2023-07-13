import CrudInterface from './crud-interface';
import TestData from '../db.json';

describe('CRUD Interface', () => {
	it('can support adding a new to-do item', () => {
		const toDoStore = structuredClone(TestData.toDos);
		const crudInterface = CrudInterface(toDoStore);
		expect(toDoStore.length).toBe(2);

		crudInterface.createToDo('Test Three');
		expect(toDoStore.length).toBe(3);
		expect(toDoStore[2].id).toBe('3');
		expect(toDoStore[2].text).toBe('Test Three');
		expect(toDoStore[2].done).toStrictEqual(false);
	});

	describe('can support reading a list of to-do items', () => {
		it('when populated', () => {
			const toDoStore = structuredClone(TestData.toDos);
			const crudInterface = CrudInterface(toDoStore);

			const result = crudInterface.readToDoList();
			expect(result.length).toBe(2);
			expect(result[0]).not.toBe(toDoStore[0]);
		});
		it('when empty', () => {
			const crudInterface = CrudInterface();

			const result = crudInterface.readToDoList();
			expect(result.length).toBe(0);
		});
	});

	describe('can support updating of a to-do item to done', () => {
		it('when found', () => {
			const toDoStore = structuredClone(TestData.toDos);
			const crudInterface = CrudInterface(toDoStore);

			expect(toDoStore.length).toBe(2);
			expect(toDoStore[1].done).toStrictEqual(false);

			crudInterface.updateToDo('2');
			expect(toDoStore[1].done).toStrictEqual(true);
		});
		it('when not found', () => {
			const toDoStore = structuredClone(TestData.toDos);
			const crudInterface = CrudInterface(toDoStore);

			expect(toDoStore.length).toBe(2);
			crudInterface.updateToDo('42');
		});
	});

	describe('can support deletion of a to-do item', () => {
		it('when found', () => {
			const toDoStore = structuredClone(TestData.toDos);
			const crudInterface = CrudInterface(toDoStore);

			expect(toDoStore.length).toBe(2);

			crudInterface.deleteToDo('2');
			expect(toDoStore.length).toBe(1);
		});
		it('when not found', () => {
			const toDoStore = structuredClone(TestData.toDos);
			const crudInterface = CrudInterface(toDoStore);

			expect(toDoStore.length).toBe(2);

			crudInterface.deleteToDo('42');
			expect(toDoStore.length).toBe(2);
		});
	});
});
