import { useEffect, useState } from "react";
import service from './service/service'
import './index.css'

const App = () => {

	useEffect(() => {
		service.getAllPerson()
			.then(notes => {
				setPersons(notes)
			})
	}, [])

	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchName, setSearchName] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [successAdd, setSuccessAdd] = useState(null)
	const [errorServer, setErrorServer] = useState(null)

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};
	const handleSearchNameChange = (event) => {
		setSearchName(event.target.value);

		handleSearch(event.target.value);
	};

	const handleSearch = (target) => {
		if (target === "") {
			setSearchResult([]);
			return;
		}
		let result = persons.filter((person) =>
			person.name.toLowerCase().includes(target.toLowerCase())
		);
		setSearchResult(result);
	};

	const addName = (event) => {
		event.preventDefault();

		let checkPerson = persons.find((person) => person.name === newName);
		if (checkPerson) {
			const userAnswer = window.confirm("Do you want to change phone number?", false)
			if (userAnswer && newNumber) {
				const nameObj = {
					name: checkPerson.name,
					number: newNumber,
					id: checkPerson.id
				};
				service.updataPerson(checkPerson.id, nameObj)
					.then(response => {
						setPersons(persons.map(person => person.id === checkPerson.id ? response : person))
					})
					.catch(error => {
						setErrorServer('this user has already removed from server.')

						setTimeout(() => {
							setErrorServer(null)
						}, 5000)
					})
			}
			return;
		}
		if (newName && newNumber) {
			const nameObj = {
				name: newName,
				number: newNumber,
				id: persons.length + 1
			};

			service.createPerson(nameObj).then(newPerson => {
				//console.log(newPerson)
				setPersons(persons.concat(newPerson));
				setNewName("");
				setNewNumber("");

				setSuccessAdd(newPerson.name)

				setTimeout(() => {
					setSuccessAdd(null)
				}, 5000)
			})
			return;
		}
		alert("Please fill all place");
	};

	const deleteName = (id) => {
		const answerUser = window.confirm("Are you really want to delete this person?", false)
		if (answerUser) {
			setPersons(persons.filter(peroson => peroson.id !== id))
			service.deletePerson(id)
		}

	}

	const SuccessAdd = ({ message }) => {
		if (message === null) {
			return;
		}

		return (
			<div className="success-add">
				Added {message}
			</div>
		)
	}

	const ErrorServer = ({ error }) => {
		if (error === null) {
			return;
		}
		return (
			<div className="error-server">
				Information of {error}
			</div>
		)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<SuccessAdd message={successAdd} />
			<ErrorServer error={errorServer} />
			<div>
				<div>
					filter shown with{" "}
					<Input value={searchName} handleChange={handleSearchNameChange} />
				</div>
				<Phonebook persons={searchResult} deleteName={deleteName} />
			</div>
			<PersonForm
				addName={addName}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<Phonebook persons={persons} deleteName={deleteName} />
		</div>
	);
};

//Components=====================================================================

const PersonForm = (props) => {
	return (
		<form onSubmit={props.addName}>
			<h2>add a new</h2>
			<div>
				name:{" "}
				<Input value={props.newName} handleChange={props.handleNameChange} />
			</div>
			<div>
				number:{" "}
				<Input
					value={props.newNumber}
					handleChange={props.handleNumberChange}
				/>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

const Contact = ({ person, deleteName }) => {
	return (
		<li>
			{person.name} / {person.number}{" "}
			<button onClick={() => deleteName(person.id)} >delete</button>
		</li>
	);
};

const Input = ({ value, handleChange }) => {
	return <input value={value} onChange={handleChange} />;
};

const Phonebook = ({ persons, deleteName }) => {
	return (
		<ul>
			{persons.map((person) => (
				<Contact key={person.id} person={person} deleteName={deleteName} />
			))}
		</ul>
	);
};

export default App;
