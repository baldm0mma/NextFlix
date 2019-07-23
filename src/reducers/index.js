import { combineReducers } from 'redux';
import { getMoviesReducer } from './getMoviesReducer';
import userReducer from './UserReducer';
import { throwErrorReducer } from './throwErrorReducer';
import { isLoadingReducer } from './isLoadingReducer';
import { chooseGenreReducer } from './chooseGenreReducer';
import { chooseSpecificMovieReducer } from './chooseSpecificMovieReducer';
import { searchQueryReducer } from './searchQueryReducer'
import { userFavReducer } from './userFavReducer'

const rootReducer = combineReducers({
  movies: getMoviesReducer,
  user: userReducer,
  isLoading: isLoadingReducer,
  throwError: throwErrorReducer,
  chosenGenre: chooseGenreReducer,
  specificMovie: chooseSpecificMovieReducer,
  searchQuery: searchQueryReducer,
  // userFavorites: userFavReducer
});

export default rootReducer;
