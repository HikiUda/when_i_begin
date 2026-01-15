import axios from 'axios'

const baseUrl = '/api/persons/';
//'http://localhost:3001/api/persons'

const getAllPerson = () => {
	const request = axios.get(baseUrl)
	return request.then(response => {
		//console.log(response.data)
		return response.data
	})
}

const createPerson = (newPerson) => {
	const request = axios.post(baseUrl, newPerson)
	return request.then(response => {
		//console.log(newPerson)
		return response.data
	})
}

const deletePerson = (id) => {
	const url = `${baseUrl}${id}`
	axios.delete(url, id)
}

const updataPerson = (id, rePerson) => {
	const url = `${baseUrl}${id}`
	const request = axios.put(url, rePerson)
	return request.then(response => {
		return response.data
	})
}

export default { getAllPerson, createPerson, deletePerson, updataPerson }