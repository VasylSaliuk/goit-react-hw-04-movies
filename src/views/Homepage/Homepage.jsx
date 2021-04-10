import styles from './Homepage.module.css';
import { Component } from 'react';
import axios from 'axios';

import MoviesList from '../../components/MoviesList';

export default class Homepage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const response = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/day?api_key=0f42664b7f6700c34263c8262c49b65b',
    );

    this.setState({
      movies: response.data.results,
    });
  }

  render() {
    const { movies } = this.state;

    return (
      <div className={`container`}>
        <h1 className={styles.title}>Trending today</h1>
        <MoviesList movies={movies} />
      </div>
    );
  }
}
