import { API_KEY } from "./key.js";

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': API_KEY,
		'X-RapidAPI-Host': 'football98.p.rapidapi.com'
	}
};

// fetch('https://football98.p.rapidapi.com/laliga/squadname/realmadrid', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

//https://football98.p.rapidapi.com/laliga/table/squadposition/1

fetch('https://football98.p.rapidapi.com/laliga/news/', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));



    