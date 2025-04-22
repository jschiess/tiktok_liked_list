import express from 'express';
const app = express();

import cookieParser from 'cookie-parser';
import cors from 'cors';

app.use(cookieParser());
app.use(cors());

app.listen(5000)

const CLIENT_KEY = 'sbawv7b70azxqaibqj' // this value can be found in app's developer portal

const SERVER_ENDPOINT_REDIRECT = 'http://localhost:4200/' // this value can be found in app's developer portal
const CODE_VERIFIER = 'your_unique_code_verifier'
const CODE_CHALLENGE = 'SHA256_hash_of_code_verifier'
app.get('/oauth', (req, res) => {
	const csrfState = Math.random().toString(36).substring(2);
	res.cookie('csrfState', csrfState, { maxAge: 60000 });

	let url = 'https://www.tiktok.com/v2/auth/authorize/';

	// the following params need to be in `application/x-www-form-urlencoded` format.
	url += `?client_key=${CLIENT_KEY}`;
	url += '&scope=user.info.basic';
	url += '&response_type=code';
	url += `&redirect_uri=${SERVER_ENDPOINT_REDIRECT}`;
	url += '&state=' + csrfState;
	url += `&code_challenge=${CODE_VERIFIER}`;
	url += '&code_challenge_method=S256'
	res.redirect(url);
})

