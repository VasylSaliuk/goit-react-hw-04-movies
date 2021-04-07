import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import fetchImages from './services/pixabayApi';
import PageTitle from './components/PageTitle';
import Loader from './components/Loader';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';

class App extends Component {
  state = {
    images: [],
    query: '',
    currentPage: 1,
    isLoading: false,
    error: '',
    largeImage: null,
    showModal: false,
    totalHits: null,
    perPage: 12,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.getImages();
    }
  }

  getImages(query, currentPage) {
    fetchImages(query, currentPage)
      .then(({ hits, totalHits }) => {
        const newImages = hits.map(image => {
          return {
            id: image.id,
            largeImageURL: image.largeImageURL,
            webformatURL: image.webformatURL,
            tags: image.tags,
          };
        });

        this.setState({
          isLoading: true,
          images: [...this.state.images, ...newImages],
          totalHits,
        });

        if (currentPage !== 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => {
        this.setState({
          images: [],
          error: error.message,
        });
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  submitHandler = query => {
    this.setState(prevState => {
      if (prevState.query === query) {
        return;
      }
      return { query, currentPage: 1, images: [] };
    });
  };

  incrementPage = () => {
    this.setState(({ currentPage }) => ({ currentPage: currentPage + 1 }));
  };

  setLargeImage = image => {
    this.setState({ largeImage: image });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal, images, isLoading, error, largeImage, totalHits, currentPage, perPage } = this.state;
    const showLoadMoreButton = images.length > 0 && !isLoading;

    return (
      <>
        {error && <h1>Something went wrong</h1>}
        <PageTitle title="React. HomeWork-3.2. Image Finder" />
        <Searchbar onSubmit={this.submitHandler} />
        <ImageGallery images={images} onClick={this.setLargeImage} />
        {isLoading && <Loader />}

        {showLoadMoreButton && totalHits > currentPage * perPage && <Button onLoadMore={this.incrementPage} />}

        {showModal && <Modal onClose={this.toggleModal} url={largeImage} />}

        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
