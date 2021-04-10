import styles from './MoviesPage.module.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink, Link, Redirect, Switch } from 'react-router-dom';

import MoviesList from '../../components/MoviesList';

class MoviesPage extends Component {
  state = {
    query: '',
    movies: [],
  };

  componentDidMount() {
    if (this.props.location.search) {
      this.fetch(this.props.location.search.slice(7));
    }
  }

  hendleChange = evt => {
    this.setState({ query: evt.currentTarget.value.toLowerCase() });
  };

  hendleSubmit = evt => {
    const { location, history } = this.props;

    evt.preventDefault();

    if (this.state.query.trim() === '') {
      alert('You enter empty query!');
      return;
    }

    this.fetch(this.state.query);

    history.push({ ...location, search: `query=${this.state.query}` });
  };

  fetch = query => {
    return axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=0f42664b7f6700c34263c8262c49b65b&language=en-US&page=1&include_adult=false`,
      )
      .then(response =>
        this.setState({
          movies: response.data.results,
        }),
      );
  };

  render() {
    const { movies } = this.state;

    return (
      <div className={`container ${styles.container}`}>
        <form className={styles.searchForm} onSubmit={this.hendleSubmit}>
          <input
            className={styles.searchFormInput}
            type="text"
            placeholder="Search movies"
            value={this.state.query}
            onChange={this.hendleChange}
          />
          <button type="submit">
            <span className={styles.searchFormButtonLabel}>Search</span>
          </button>
        </form>

        <MoviesList movies={movies} />
      </div>
    );
  }
}

export default MoviesPage;
