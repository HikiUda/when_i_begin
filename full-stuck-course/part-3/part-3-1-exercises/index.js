const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const { Client } = require("pg");

let persons = [
	{
		"id": 1,
		"name": "Arto Hellas",
		"number": "040-123456"
	},
	{
		"id": 2,
		"name": "Ada Lovelace",
		"number": "39-44-5323523"
	},
	{
		"id": 3,
		"name": "Dan Abramov",
		"number": "12-43-234345"
	},
	{
		"id": 4,
		"name": "Mary Poppendieck",
		"number": "39-23-6423122"
	}
];

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

app.use(express.json())

const mor = morgan(function (tokens, req, res) {
	//console.log(req.body)
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'), '-',
		tokens['response-time'](req, res), 'ms',
		JSON.stringify(req.body)
	].join(' ')
})
app.use(mor)
app.use(cors())

app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/info', (request, response) => {
	let date = new Date();
	let info = `<h1>Phonebook has info for ${persons.length} people</h1>
	<h2>${date}</h2>`;
	response.send(info)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const personRes = persons.find(person => person.id === id)

	if (personRes) {
		response.json(personRes)
	} else {
		response.status(404).end()
	}
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})

const generateId = () => {
	const maxId = persons.length > 0
		? Math.max(...persons.map(n => n.id))
		: 0
	return maxId + 1
}


app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body?.name) {
		return response.status(400).json({
			error: "name missing"
		})
	}
	if (!body?.number) {
		return response.status(400).json({
			error: "number missing"
		})
	}

	isExistsPerson = persons.find(person => person.name === body.name)

	if (isExistsPerson) {
		return response.status(400).json({
			error: "The name already exists in the phonebook"
		})
	}

	let person = {
		name: body.name,
		number: body.number,
		id: generateId()
	}

	persons = persons.concat(person)

	response.json(persons)
})

//DATA-BASE================================================================

//_15yZx79YybPd5gFMWkr7g
//"postgresql://wendsew:<ENTER-SQL-USER-PASSWORD>@comely-horgi-2064.7s5.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full"

let passwordDB = "postgresql://wendsew:_15yZx79YybPd5gFMWkr7g@comely-horgi-2064.7s5.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full"

process.argv.forEach((val, index) => {
	console.log(`${index}: ${val}`);
});

(async () => {
	const client = new Client({
		connectionString: passwordDB,
		application_name: "$ docs_quickstart_node"
	});

	const statements = [
		// Clear any existing data
		"DROP TABLE IF EXISTS messages",
		// CREATE the messages table
		"CREATE TABLE IF NOT EXISTS messages (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), message STRING)",
		// INSERT a row into the messages table
		"INSERT INTO messages (message) VALUES ('Hello world!')",
		// SELECT a row from the messages table
		"SELECT message FROM messages",
	];

	try {
		// Connect to CockroachDB
		await client.connect();
		for (let n = 0; n < statements.length; n++) {
			let result = await client.query(statements[n]);
			if (result.rows[0]) { console.log(result.rows[0].message); }
		}
		await client.end();
	} catch (err) {
		console.log(`error connecting: ${err}`);
	}

	// Exit program
	process.exit();
})().catch((err) => console.log(err.stack));