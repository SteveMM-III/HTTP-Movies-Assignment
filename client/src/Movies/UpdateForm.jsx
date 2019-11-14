import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
  id: '',
  title: '',
  director: '',
  metascore: 0,
  stars: []
};

const UpdateForm = props => {
  const [movie, setMovie] = useState( initialItem );

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if ( e.target.name === 'metascore' ) {
      value = parseInt( value , 10 );
    } else if ( e.target.name ==='stars' ) {
      value = value.split( ',' );
    }
    setMovie( {
      ...movie, [e.target.name]: value
    } );
  }

  useEffect( () => {
    if ( props.movies.length > 0 ) {
      const newMovie = props.movies.find(
        thing => `${ thing.id }` === props.match.params.id
      );
      setMovie( newMovie );
    }
  }, [ props.movies, props.match.params.id ] );

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put( `http://localhost:5000/api/movies/${ movie.id }`, movie )
      .then( res => {
        props.updateMovies( [ ...props.movies, res.data ] );
        props.history.push( '/' );
      } )
      .catch( err => console.error( 'Error: ', err ) );
  };

  if ( props.movies.length === 0 ) {
    return <h2>Loading data...</h2>;
  }

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          name="title"
          onChange={ changeHandler }
          placeholder="title"
          value={ movie.title }
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={ movie.director }
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={ movie.metascore }
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Star1, Star2, etc"
          value={ movie.director }
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;