import axios from 'axios';

export const konsulAPI = axios.create({
	baseURL: 'https://konsultasi-api.herokuapp.com',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
		'Content-Type': 'application/json',
	},
});
