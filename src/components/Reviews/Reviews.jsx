import React, { Component } from 'react';
import styles from './Reviews.module.css';
import axios from 'axios';

class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=0f42664b7f6700c34263c8262c49b65b&language=en-US`,
    );

    this.setState({
      reviews: response.data.results,
    });
  }

  render() {
    const { reviews } = this.state;

    return reviews.length > 0 ? (
      <ul className={`${styles.list} list`}>
        {reviews.map(({ id, author, content }) => {
          return (
            <li className={styles.item} key={id}>
              <h4 className={styles.title}>{`Author: ${author}`}</h4>
              <p className={styles.text}>{content}</p>
            </li>
          );
        })}
      </ul>
    ) : (
      <p>We haven't any rewiews for this movie</p>
    );
  }
}

export default Reviews;