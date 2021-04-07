import React, { Component } from 'react';
import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  state = {
    largeImageURL: this.props.largeImageURL,
  };

  handleChange = () => {
    this.props.onClick(this.state.largeImageURL);
  };

  render() {
    return (
      <div className={styles.ImageGalleryItem} onClick={this.handleChange}>
        <img
          src={this.props.webformatURL}
          alt={this.props.id}
          className={styles.ImageGalleryItemImage} />
      </div>
    );
  }
}

export default ImageGalleryItem;
