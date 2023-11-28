import Searchbar from './Searchbar/Searchbar';
import { requestImage } from 'service/request';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';
import { ErrorStyled } from './ErrorMessage/Error.styled';
import Modal from './Modal/Modal';
import { AppStyled } from './AppStyled/AppStuled';
import { useEffect, useState } from 'react';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    requestImage(query, page)
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          setIsEmpty(true);
          setIsLoadMore(false);
          return;
        }
        setImages(prev => {
          return [...prev, ...hits];
        });
        setIsLoadMore(page < Math.ceil(totalHits / 12));
      })
      .catch(err => {
        console.log('err', err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, query]);
  const handleSubmit = request => {
    if (request === query) {
      return;
    }
    setQuery(request);
    setPage(1);
    setImages([]);
    setError('');
    setIsEmpty(false);
  };
  const loadMore = () => {
    setPage(prev => prev + 1);
  };
  const openModal = url => {
    setUrl(url);
  };
  return (
    <AppStyled>
      {isLoading && <Loader />}
      <Searchbar toSubmit={handleSubmit} />
      {isEmpty && <ErrorStyled>Sorry. There are no images ... 😭</ErrorStyled>}
      {url && <Modal src={url} closeModal={openModal} />}
      {error && <ErrorStyled>Sorry. {error}...😭</ErrorStyled>}
      <ImageGallery images={images} openModal={openModal} />
      {isLoadMore && <Button onClick={loadMore}>Load More</Button>}
    </AppStyled>
  );
};



export default App;
