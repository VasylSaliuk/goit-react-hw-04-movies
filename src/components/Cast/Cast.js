import styles from './Cast.module.css';
import { Component } from 'react';
import axios from 'axios';
import defaultImage from './defaultImg.png';

class Cast extends Component {
  state = {
    cast: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=0f42664b7f6700c34263c8262c49b65b&language=en-US`,
    );

    this.setState({
      cast: response.data.cast,
    });
  }

  render() {
    const { cast } = this.state;

    return (
      <ul className={`${styles.list} list`}>
        {cast.map(el => {
          return (
            <li className={styles.item} key={el.credit_id}>
              <img
                className={styles.img}
                src={el.profile_path ? `https://image.tmdb.org/t/p/w500/${el.profile_path}` : `${defaultImage}`}
                alt={el.name}
              ></img>
              <h4 className={styles.title}>{el.name}</h4>
              <p className={styles.text}>{el.character}</p>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Cast;
