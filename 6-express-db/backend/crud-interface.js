require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PWD}@cluster0.fofguso.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

(async function () {
	async function connectDatabase() {
		try {
			await client.connect();
			await client.db('admin').command({ ping: 1 });
		} catch {
			// await client.close();
		}
	}
	await connectDatabase().catch(console.dir);
})();
const db = client.db(process.env.DB_NAME);
const col = db.collection(process.env.DB_COLLECTION);

module.exports = async function () {
	return {
		createToDo,
		readToDoList,
		updateToDo,
		deleteToDo,
	};

	async function createToDo(toDoText) {
		return await col.insertOne({
			text: toDoText,
			done: false,
		});
	}

	async function readToDoList() {
		return await col.find({}).toArray();
	}

	async function updateToDo(toDoId, payload = { done: true }) {
		return await col.updateOne(
			{
				_id: new ObjectId(toDoId),
			},
			{ $set: payload }
		);
	}

	async function deleteToDo(toDoId) {
		return await col.deleteOne({
			_id: new ObjectId(toDoId),
		});
	}
};
