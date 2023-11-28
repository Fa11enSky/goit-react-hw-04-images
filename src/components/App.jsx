import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { requestImage } from 'service/request';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';
import { ErrorStyled } from './ErrorMessage/Error.styled';
import Modal from './Modal/Modal';
import { AppStyled } from './AppStyled/AppStuled';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    totalPage: 1,
    error: '',
    isLoadMore: false,
    isLoading: false,
    isEmpty: false,
    url: '',
  };
  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      requestImage(this.state)
        .then(({ hits, totalHits }) => {
          if (!hits.length) {
            this.setState({ isEmpty: true, isLoadMore: false });
            return;
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            totalPage: totalHits,
            isLoadMore: page < Math.ceil(totalHits / 12),
          }));
        })
        .catch(err => {
          this.setState({ error: err.message });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleSubmit = query => {
    if (this.state.query === query) {
      return
    }
    this.setState({
      query,
      page: 1,
      images: [],
      error: '',
      isEmpty: false,
    });
  };
  loadMore = () => {
    this.setState(prevState => ({ page: (prevState.page + 1) }));
  };
  openModal = url => {
    this.setState({ url });
  };
  render() {
    const { images, isLoadMore, isLoading, error, isEmpty, url } = this.state;
    return (
      <AppStyled>
        {isLoading && <Loader />}
        <Searchbar handleSubmit={this.handleSubmit} />
        {isEmpty && (
          <ErrorStyled>Sorry. There are no images ... 😭</ErrorStyled>
        )}
        {url && <Modal srs={url} closeModal={this.openModal} />}
        {error && <ErrorStyled>Sorry. {error}...😭</ErrorStyled>}
        <ImageGallery images={images} openModal={this.openModal} />
        {isLoadMore && <Button onClick={this.loadMore}>Load More</Button>}
      </AppStyled>
    );
  }
}

export default App;
