import { newUserUrl, userSignInURL } from './apiUrls';
import apiKey from '../../apikey'

export const findGenres = async () => {
  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
  try {
    const response = await fetch(genreUrl)
    const parsed = await response.json()
    return parsed
  } catch (error) {
    throw Error(error.message)
  }
}


// export const findGenres = async () => {
//   const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US` 
//   try {
//     const response  =  await fetch (genreUrl)
//     const parsed = await response.json()
//     return parsed
//   } catch (error) {
//     throw Error(error.message)
//   }
// }

const sendUserLogin = async (email, password) => {
	const user = {
		email,
		password
	};
	try {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		};
		const response = await fetch(userSignInURL, options);
		const parsed = await response.json();
		return parsed;
	} catch (error) {
		throw Error('Failed to log in; either your email or your password are incorrect. Please try again, or create a new account.', error);
	}
};

const sendNewAccount = async newAccount => {
	try {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newAccount)
		};
		const response = await fetch(newUserUrl, options);
		// console.log('new acc', response);
		return response;
	} catch (error) {
		throw Error('Sorry, we failed to create your account. Your email or password may already be in use. Please use a different email or password, or attempt to login, as you may already have an account.', error);
	}
};

const sendFavorite = async favoriteMovie => {
	console.log(favoriteMovie);
	try {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(favoriteMovie)
		};
		const response = await fetch(`${userSignInURL}/favorites/new`, options);
		const parsed = await response.json();
		return parsed;
	} catch (error) {
		throw Error('Failed to favorite', error);
	}
};

export {
	sendNewAccount,
	sendUserLogin,
	sendFavorite
};
