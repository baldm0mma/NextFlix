import React from 'react';
import { sendFavorite, deleteFavorite, fetchUserFavorites } from '../../utils/API/ApiFetch';
import {setFavorites,chooseMovie } from '../../actions';
// import { chooseMovie, setFavorites, addMovie } from '../../actions';
import { Link, Redirect } from 'react-router-dom';
import filledHeart from '../../images/like-filled.png';
import emptyHeart from '../../images/like-empty.png';
import moreDetails from '../../images/clapperboard.png';
import { connect } from 'react-redux'
const FavButton = (props) => {
  // const { title, movie_id, isFavorited } = movieInfo;
  const { chooseSpecificMovie, user, movieInfo, setFavorites, title, movie_id, isFavorited} = props
  // const seeSpecificMovie = () => {
  //   chooseSpecificMovie(title, movie_id);
  // };

  const toggleFav = async movie => {
    console.log('user id', user.id);
    if (user.id) {
      const favorites = await fetchUserFavorites(user.id);
      setFavorites(favorites);
      console.log(user.favorites);
    }
    const foundMovie = user.favorites.find(favorite => favorite.movie_id === movie_id);
    console.log(foundMovie);
    if (foundMovie) {
      deleteFavorite(user.id, movie_id);
    } else if (!foundMovie && user.id) {
      const favMovie = {
        ...movieInfo,
        ...user.id
      }
      console.log(favMovie)
      sendFavorite(favMovie);
      const favorites = await fetchUserFavorites(user.id);
      setFavorites(favorites.data);
    } else {
      return <Redirect to="login" />
    }
  };

  return (
    <div className="movie-buttons">
      <Link to={`/movies/${title}`}>
        <button onClick={() => chooseSpecificMovie(title, movie_id)}>
          <img alt="more details" src={moreDetails} />
        </button>
      </Link>
      <button onClick={() => toggleFav(movie_id)}>
        <img
          className="favorite__img-button"
          alt="favorite this movie"
          src={isFavorited ? filledHeart : emptyHeart}
        />
      </button>
    </div>
  );
};

export const mapStateToProps =(state) => ({
  user: state.user,
  specificMovie: state.specificMovie
});

export const mapDispatchToProps=(dispatch) => ({
  chooseSpecificMovie: (title, movie_id) => dispatch(chooseMovie(title, movie_id)),
  setFavorites: favorites => dispatch(setFavorites(favorites))
})





export default connect(mapStateToProps, mapDispatchToProps)(FavButton)
